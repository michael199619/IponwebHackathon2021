import { getCity, changeImage } from '../src/app';
import path from 'path';

describe('Endpoints', () => {
    const src = path.join(__dirname, '..', 'example', 'IMG_0603.HEIC');

    it('getCity', async () => {
        const city = await getCity(src);
        expect(city).toBe('ᕿᑭᖅᑖᓗᒃ Qikiqtaaluk Region, ᓄᓇᕗᑦ Nunavut, Canada');
    });

    it('changeImage', async () => {
        const bytes = await changeImage(src, 50, 50);
        expect(bytes).toBe(1251);
    });
})
