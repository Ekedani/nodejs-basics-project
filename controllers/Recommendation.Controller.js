const https = require('https');

exports.getRandomBook = async (req, res, next) => {
  const pageNum = Math.floor(Math.random() * 2142 + 1);
  const options = {
    hostname: 'gutendex.com',
    path: `/books/?page=${pageNum}`,
    method: 'GET'
  };
  const reqRand = https.request(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const booksPage = JSON.parse(data).results;
      const randomBookIdx = Math.ceil(Math.random() * booksPage.length);
      res.send(booksPage[randomBookIdx]);
    });
  });
  reqRand.on('error', (error) => {
    next(error);
  });
  reqRand.end();
};
