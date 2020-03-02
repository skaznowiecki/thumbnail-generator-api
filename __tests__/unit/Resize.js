const FileType = require('file-type');
const Resize = require('../../helpers/Resize');
const fs = require('fs');

describe('Resize', () => {

  it('[retrieveUploadPath] should be return path to upload file from file', async (done) => {
    const img = fs.readFileSync(__dirname + '/../stub/images/png_image.png');
    const buffer = Buffer.from(img);
    const resource = await Resize.retrieveUploadPath(buffer);

    const expectObject = expect.objectContaining({
      id: expect.any(String),
      path: expect.any(String),
    });

    expect(resource).toEqual(expectObject);
    done();
  });

  it('[retrieveResizeFolder] should be return path to upload file from id', (done) => {
    const name = Resize.retrieveResizedFolder(1);
    expect(name).toEqual('thumbs/1');
    done();
  });

  it('[retrieveResizedImagePath] should be return path to upload resized file', (done) => {
    const name = 'uploads/test.png';
    const size = {
      height: 200,
      width: 200
    };
    const expectName = `thumbs/test/200x200.png`;
    const resizedName = Resize.retrieveResizedImagePath(name, size);
    expect(resizedName).toEqual(expectName);
    done();
  });


  it('[resize] should be return buffer with image resized', async (done) => {
    const img = fs.readFileSync(__dirname + '/../stub/images/png_image.png');
    const buffer = Buffer.from(img);
    const size = {
      height: 100,
      width: 100
    };
    const resizedImage = await Resize.resize(buffer, size);
    const fileType = await FileType.fromBuffer(resizedImage);

    expect(fileType.ext).toEqual('png');
    expect(Buffer.isBuffer(resizedImage)).toBeTruthy();

    done();
  });

});