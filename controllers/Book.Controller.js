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
    const book = {
      title: 'Created Book',
      author: 'Temp'
    };
    res.send(book);
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
