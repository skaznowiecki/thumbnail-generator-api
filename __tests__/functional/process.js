
const Storage = require('../../helpers/Storage');
const fs = require('fs');

const {
  resize
} = require('../../handlers/process');

jest.mock('../../helpers/Storage');

beforeEach(async () => {
  Storage.mockClear();
});

describe('Resize thumb', () => {
  it('should return empty response', async (done) => {

    const img = fs.readFileSync(__dirname + '/../stub/images/png_image.png');
    const buffer = Buffer.from(img);

    const storageMock = Storage.mockImplementationOnce(() => ({
      get: (path) => buffer,
      put: (resizeImage, key) => null
    }));

    const event = {
      Records: [{
        s3: {
          object: {
            key: 'uploads/1cr1o2c0vk75d38hw.png',
            size: 4073,
          }
        }
      }]
    };

    await resize(event);
    expect(Storage).toHaveBeenCalledTimes(1);
    done();
  });
});