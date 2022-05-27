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
    const user = {
      name: 'Stepan'
    };
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = {
      id,
      name: 'found Stepan'
    };
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = {
      id,
      name: 'deleated Stepan'
    };
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = {
      id,
      name: 'updated Stepan'
    };
    res.send(user);
  } catch (err) {
    next(err);
  }
};
