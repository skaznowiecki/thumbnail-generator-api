const AWS = require('aws-sdk')
const { REGION, ACCESS_KEY, SECRET_KEY, BUCKET } = process.env;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
});

class Storage {
  /**
   * Represent an instance of conector to s3
   * @constructor
   */
  constructor() {
    this.bucket = BUCKET
    this.s3 = new AWS.S3();
  }

  /**
   * Upload an image to s3
   * 
   * @param {string} image - Buffer with valid imagen 
   * @param {string} filename - File name 
   */
  async put(image, filename) {
    const [path, ext] = filename.split('.');
    var params = {
      Body: image,
      Bucket: this.bucket,
      Key: filename,
      ContentEncoding: 'base64',
      ContentType: `image/${ext}`
    };

    return await this.s3.upload(params).promise();
  }
  /**
   * Retrive an image from s3
   * 
   * @param {string} filename - File name 
   */
  async get(filename) {
    const params = {
      Bucket: this.bucket,
      Key: filename,
    };
    const response = await this.s3.getObject(params).promise();
    return response.Body;
  }

  /**
   * Retrive a list of objects from specific path
   * 
   * @param {string} path - Folder path 
   */
  async list(path) {
    const response = await this.s3.listObjects({
      Bucket: this.bucket,
      Prefix: path,
      MaxKeys: 10
    }).promise();

    return response.Contents;
  }

  /**
   * Retrieve public url to access a specific file
   * 
   * @param {string} path - Folder path 
   */
  url(path) {
    const { BASE_PATH } = process.env;
    return BASE_PATH + '/' + path;
  }

};


module.exports = Storage;