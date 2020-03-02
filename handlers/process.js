const Storage = require('../helpers/Storage');
const Resize = require('../helpers/Resize');

const sizes = [
  { width: 120, height: 120 },
  { width: 160, height: 120 },
  { width: 400, height: 300 },
];

module.exports.resize = async event => {
  const storage = new Storage();

  event.Records.forEach(async (record) => {
    const object = record.s3.object;
    const img = await storage.get(object.key);
    sizes.forEach(async (size) => {
      const resizeImage = await Resize.resize(img, size);
      const key = Resize.retrieveResizedImagePath(object.key, size);
      await storage.put(resizeImage, key);
    });
  });
};
