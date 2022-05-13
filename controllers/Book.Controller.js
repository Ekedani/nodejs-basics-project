const https = require('https');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = [
      {
        title: 'Found Book (1)',
        author: 'Temp'
      },
      {
        title: 'Found Book (2)',
        author: 'Temp'
      }
    ];
    res.send(books);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    //const title = req.body.title;
    const book = {
      title: '',
      author: 'Temp'
    };
    res.send(req.body);
  } catch (err) {
    next(err);
  }
};

exports.findBookById = async (req, res, next) => {
  try {
    const book = {
      title: 'Found Book',
      author: 'Temp'
    };
    res.send(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = {
      title: 'Deleted Book',
      author: 'Temp'
    };
    res.send(book);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = {
      title: 'Updated Book',
      author: 'Temp'
    };
    res.send(book);
  } catch (err) {
    next(err);
  }
};

exports.getRandomBook = async (req, res) => {
  let randombook;
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
      const randombookIndx = Math.ceil(Math.random() * booksPage.length);
      randombook = booksPage[randombookIndx];
      console.log(booksPage[randombookIndx]);
    });
  });
  reqRand.on('error', (error) => {
    res.send(error);
  });
  reqRand.end();
};
