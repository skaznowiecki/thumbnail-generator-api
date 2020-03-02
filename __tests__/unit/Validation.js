const Validation = require('../../helpers/Validation');
const ValidationException = require('../../exceptions/ValidationException');
const fs = require('fs');


describe('Validation', () => {

  it('should be return Validation Exception sending empty data', async (done) => {
    const body = {};
    const buffer = Buffer.from('', 'base64');
    try {
      await Validation.make(body, buffer);
    } catch (error) {
      expect(error.status).toEqual(422);
      expect(error.message).toEqual('Image key is required');
      expect(error instanceof ValidationException).toBeTruthy();
      done();
    }
  });

  it('should be return Validation Exception sending an invalid image', async (done) => {
    //SET ENV VAR
    process.env.ALLOW_FORMATS = 'png';
    const body = {
      image: 'test'
    };
    const buffer = Buffer.from('');

    try {
      await Validation.make(body, buffer);
    } catch (error) {
      expect(error.status).toEqual(422);
      expect(error.message).toEqual('Invalid image');
      expect(error instanceof ValidationException).toBeTruthy();
      done();
    }
  });

  it('should be return Validation Exception sending an image with diferent type', async (done) => {
    //SET ENV VAR
    process.env.ALLOW_FORMATS = 'png';
    const body = {
      image: 'test'
    };
    const img = fs.readFileSync(__dirname + '/../stub/images/jpg_image.jpg');
    const buffer = Buffer.from(img);

    try {
      await Validation.make(body, buffer);
    } catch (error) {
      expect(error.status).toEqual(422);
      expect(error.message).toEqual('Image should be [png]');
      expect(error instanceof ValidationException).toBeTruthy();
      done();
    }
  });

  it('should be return Validation Exception sending a heavy image', async (done) => {
    //SET ENV VAR
    process.env.MAX_SIZE = 1;
    process.env.ALLOW_FORMATS = 'jpg';

    const body = {
      image: 'test'
    };
    const img = fs.readFileSync(__dirname + '/../stub/images/big_image.jpeg');
    const buffer = Buffer.from(img);

    try {
      await Validation.make(body, buffer);
    } catch (error) {
      expect(error.status).toEqual(422);
      expect(error.message).toEqual('Image size should be 1 MB or less');
      expect(error instanceof ValidationException).toBeTruthy();
      done();
    }
  });

  it('should be return empty sending a correct image', async (done) => {
    //SET ENV VAR
    process.env.MAX_SIZE = 1;
    process.env.ALLOW_FORMATS = 'png';

    const body = {
      image: 'test'
    };
    const img = fs.readFileSync(__dirname + '/../stub/images/png_image.png');
    const buffer = Buffer.from(img);

    try {
      await Validation.make(body, buffer);
    } catch (e) {
      const error = e;
    }
    expect(typeof error === 'undefined').toBeTruthy();
    done();

  });

});