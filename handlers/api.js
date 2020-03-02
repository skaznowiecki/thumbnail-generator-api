const Response = require('../helpers/Response');
const Validation = require('../helpers/Validation');
const Storage = require('../helpers/Storage');
const Resize = require('../helpers/Resize');


module.exports.store = async event => {
  try {
    const storage = new Storage();

    const body = JSON.parse(event.body);
    const buffer = Buffer.from(body.image || '', 'base64');

    await Validation.make(body, buffer);

    const { id, path } = await Resize.retrieveUploadPath(buffer);

    await storage.put(buffer, path);

    return Response.make({ id });

  } catch (error) {
    return Response.make({ message: error.message }, error.status);
  }
};

module.exports.show = async event => {
  const storage = new Storage();
  const id = event.pathParameters.id;
  const path = Resize.retrieveResizedFolder(id);
  const items = await storage.list(path);

  let files = [];

  items.forEach(item => {
    files.push(storage.url(item.Key))
  });

  return Response.make({ files });
}