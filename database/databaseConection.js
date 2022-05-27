const mongoose = require('mongoose');

module.exports = () => {
  const mongoPasword = process.env.CLUSTER_PASSWORD;
  const uri = `mongodb+srv://Andrii:${mongoPasword}@cluster0.lsltian.mongodb.net/testу`;
  mongoose.connect(uri);
};
