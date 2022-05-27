// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const app = require('./src/app');

const APP_PORT = process.env.PORT ?? 3000;

app.listen(APP_PORT, () => {
  console.log(`Now serving your express app at http://localhost:${APP_PORT}`); // eslint-disable-line
});
