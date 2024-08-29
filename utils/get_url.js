const getUrl = async (req) => {
  const file = req.file;
  return `http://104.194.157.251:5000/files/${file.originalname}`;
};
module.exports = getUrl;
