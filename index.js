const app = require('./src/app');

// TODO: Later to .env
const APP_PORT = 3000;

app.listen(APP_PORT, () => {
  console.log(`Now serving your express app at http://localhost:${APP_PORT}`); // eslint-disable-line
});
