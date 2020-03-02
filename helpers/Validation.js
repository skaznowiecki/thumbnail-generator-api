const FileType = require('file-type');
const ValidationException = require('../exceptions/ValidationException');

const validations = [
  validateParameter,
  validateType,
  validateSize
];


class Validation {
  /**
   * Execute validation
   * 
   * @param {object} body - Body parameters 
   * @param {buffer} buffer - Buffer image
   * @throws ValidationException
   */
  static async make(body, buffer) {
    validateParameter(body);
    await validateType(body, buffer);
    validateSize(body, buffer);
  }
};

/**
 * Validate the image key
 * 
 * @param {object} body - Body parameters 
 * @throws ValidationException
 */
function validateParameter(body) {
  if (!body.image)
    throw new ValidationException('Image key is required');
}

/**
 * Validate image type
 * 
 * @param {object} body - Body parameters 
 * @param {buffer} buffer - Buffer image
 * @throws ValidationException
 * 
 */
async function validateType(body, buffer) {
  const { ALLOW_FORMATS } = process.env;
  const fileType = await FileType.fromBuffer(buffer);
  const allowFormats = ALLOW_FORMATS.split(',');

  if (typeof fileType == 'undefined')
    throw new ValidationException('Invalid image');

  if (!allowFormats.includes(fileType.ext)) {
    throw new ValidationException(`Image should be [${ALLOW_FORMATS}]`);
  }
}

/**
 * Validate image size
 * 
 * @param {object} body - Body parameters 
 * @param {buffer} buffer - Buffer image
 * @throws ValidationException
 * 
 */
function validateSize(body, buffer) {
  const { MAX_SIZE } = process.env;
  const sizeInKb = buffer.length / 1e+3;
  const maxSizeInKb = MAX_SIZE * 1024;

  if (sizeInKb > maxSizeInKb)
    throw new ValidationException(`Image size should be ${MAX_SIZE} MB or less`);
}

module.exports = Validation;