const mongoose = require('mongoose');

module.exports = () => {
  const mongoPassword = process.env.CLUSTER_PASSWORD;

  const uri = `mongodb+srv://Andrii:${mongoPassword}@cluster0.lsltian.mongodb.net/NodeLab?retryWrites=true&w=majority`;
  mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch((err) => console.log(err.message));
};
