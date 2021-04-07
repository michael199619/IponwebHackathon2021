import im from 'imagemagick';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import config from './config/config'

type N = 'N' | 'S' | 'E' | 'W';
const readMetadata = promisify(im.readMetadata);
const resize = promisify(im.resize);
const stat = promisify(fs.stat);
const {API} = config;

const decodeGps = (str: string, n: N): number => {
    const [degress, minutes, seconds] = str.split(',').map(e => e.split('/').reduce((a, b) => +a / +b, 1));
    let char = 1;

    if (n === 'S' || n === 'E') {
        char = -1;
    }

    return +((degress + minutes + seconds / (60 * 60)) * char).toFixed(6);
}

export const getCity = async (path: string): Promise<string> => {
    const {exif} = await readMetadata(path);

    if (!exif) {
        throw new Error('gps is not exists');
    }

    const {gpsLatitude, gpsLatitudeRef, gpsLongitude, gpsLongitudeRef} = exif;
    const latitude = decodeGps(gpsLatitude, gpsLatitudeRef);
    const longitude = decodeGps(gpsLongitude, gpsLongitudeRef);

    return await fetch(`${API}&lat=${latitude}&lon=${longitude}`)
        .then(e => e.json())
        .then(e => e.display_name);
}

export const changeImage = async (srcPath: string, width: number = 0, height: number = 0): Promise<number> => {
    const {dir, ext, name} = path.parse(srcPath);
    const id = Math.random().toString(36).substring(7);
    const dstPath = path.join(dir, `${name}-${id}${ext}`);

    const image = await resize({srcPath, height, width, dstPath});
    return await stat(dstPath).then(({size}) => size)
}