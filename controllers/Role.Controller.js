/* eslint-disable */
const mongoose = require('mongoose');

const Role = require('../models/Role.Model');

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = Role.find();
    res.send(roles);
  } catch (error) {
    next(error);
  }
};
