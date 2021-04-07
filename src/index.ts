import * as app from './app';
import program from 'commander';

program
  .option('-c, --city', 'get city')
  .option('-w, --width <type>', 'width of image')
  .option('-h, --height <type>', 'height of image')
  .parse(process.argv);

const path = process.argv[process.argv.length - 1];
const {city, width, height} = program.opts();

if (city !== undefined) {
    app.getCity(path)
        .then(response => console.log(response));
}

if (width !== undefined || height !== undefined) {
    app.changeImage(path, width, height)
        .then(response => console.log(response));
}