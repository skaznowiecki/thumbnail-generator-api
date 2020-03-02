
const Storage = require('../../helpers/Storage');
const fs = require('fs');

const {
  store, show
} = require('../../handlers/api');
jest.mock('../../helpers/Storage');

beforeEach(async () => {
  Storage.mockClear();
});


describe('Create thumb', () => {
  it('should return response with 422 status sending invalid image', async (done) => {
    const expectedResponse = {
      statusCode: 422,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: '{"message":"Image key is required"}'
    };
    const event = {};
    event.body = JSON.stringify({});
    const response = await store(event);
    expect(response).toEqual(
      expect.objectContaining(expectedResponse)
    );
    done();
  });

  it('should return response with 200 status sending valid image', async (done) => {
    Storage.mockImplementationOnce(() => ({
      put: () => null,
    }));
    const expectedResponse = expect.objectContaining({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: expect.any(String)
    });
    const img = fs.readFileSync(__dirname + '/../stub/images/png_image.png');
    const base64 = Buffer.from(img).toString('base64');

    const event = {};
    event.body = JSON.stringify({
      image: base64
    });
    const response = await store(event);
    expect(response).toEqual(expectedResponse);
    done();
  });
});


describe('Show thumb', () => {
  it('should return response with 200 status with list of images', async (done) => {

    process.env.BASE_PATH = 'https://s3:test';

    const mockResponse = [
      { Key: 'thumbs/120x120.png' },
      { Key: 'thumbs/160x120.png' },
      { Key: 'thumbs/400x300.png' },
    ];

    Storage.mockImplementationOnce(() => ({
      list: (path) => mockResponse,
      url: (url) => `https://s3:test/${url}`
    }));

    const expectedResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        files: [
          'https://s3:test/thumbs/120x120.png',
          'https://s3:test/thumbs/160x120.png',
          'https://s3:test/thumbs/400x300.png'
        ]
      })
    };
    const img = fs.readFileSync(__dirname + '/../stub/images/png_image.png');
    const base64 = Buffer.from(img).toString('base64');

    const event = {
      pathParameters: {
        id: 1
      }
    };

    const response = await show(event);
    expect(response).toEqual(
      expect.objectContaining(expectedResponse)
    );
    done();
  });
});