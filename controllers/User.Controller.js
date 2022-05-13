exports.getAllUsers = async (req, res, next) => {
  try {
    const users = [
      {
        id: 0,
        name: 'Stepan'
      },
      {
        id: 1,
        name: 'Stepan(1)'
      }
    ];
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    //const title = req.body.title;
    const user = {
      id: Math.round(Math.random * 1000),
      name: `Stepan(${id})`
    };
    res.send(req.body);
  } catch (err) {
    next(err);
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const user = {
      id: 'foundID',
      name: 'found Stepan'
    };
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = {
      id: 'deleated ID',
      name: 'deleated Stepan'
    };
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = {
      id: 'updated ID',
      name: 'updated Stepan'
    };
    res.send(user);
  } catch (err) {
    next(err);
  }
};
