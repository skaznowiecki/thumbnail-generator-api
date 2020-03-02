class Response {

  /**
   * 
   * @param {object} data  - Json data
   * @param {integer} status - Status code, default 200 
   */
  static make(data, status) {
    return {
      statusCode: status || 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(data)
    }
  }
};

module.exports = Response;