const FileType = require('file-type');
const uniqid = require('uniqid');
const sharp = require('sharp');

class Resize {

  /**
   * Retrieve path to upload image 
   * 
   * @param {object} buffer - Buffer image
   * @returns {string} - Path to upload
   */
  static async retrieveUploadPath(buffer) {
    const fileType = await FileType.fromBuffer(buffer);
    const id = uniqid();
    const path = 'uploads/' + id + '.' + fileType.ext;
    return { id, path };
  }

  /**
   * Retrieve path where images were resized 
   * 
   * @param {integer} id - Image id 
   */
  static retrieveResizedFolder(id) {
    return 'thumbs/' + id;
  }

  /**
   * Retrieve path to resized image path 
   * 
   * @param {object} buffer - Buffer image
   * @returns {string} - Path to upload
   */
  static retrieveResizedImagePath(key, size) {
    const [folder, file] = key.split('/');
    const [name, ext] = file.split('.');
    return `thumbs/${name}/${size.width}x${size.height}.${ext}`;
  }

  /**
   * Resize image
   * 
   * @param {string} img - Base64 image 
   * @param {object} size - Contain width and height
   * 
   * @returns {object} - resized buffer image 
   */
  static async resize(img, size) {
    return sharp(img).resize(size).toBuffer();
  }

};

module.exports = Resize;