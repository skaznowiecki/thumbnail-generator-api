const Response = require('../../helpers/Response');

describe('Response', () => {
  it('should be return with status 200 and stringify data sending only data', (done) => {

    const expectedResponse = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: "{\"data\":\"test\"}"

    };
    const response = Response.make({ data: 'test' });
    expect(response).toEqual(
      expect.objectContaining(expectedResponse)
    );
    done();
  });

  it('should be return with status 404 and stringify data sending data and status', (done) => {
    const expectedResponse = {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: "{\"data\":\"test\"}"

    };
    const response = Response.make({ data: 'test' }, 404);
    expect(response).toEqual(
      expect.objectContaining(expectedResponse)
    );
    done();
  });
});