const mongoose = require('mongoose');

const mongoPasword = process.env.CLUSTER_PASSWORD;

async function main() {
  await mongoose.connect(
    `mongodb+srv://Andrii:${mongoPasword}@cluster0.lsltian.mongodb.net/testу`
  );
}
main().catch((err) => console.log(err));
