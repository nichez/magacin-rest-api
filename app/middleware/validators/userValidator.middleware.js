const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');

exports.createUserSchema = [
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 chars long'),
  body('role')
    .optional()
    .isIn([Role.Admin, Role.User])
    .withMessage('Invalid Role type'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Password must contain at least 2 characters')
    .isLength({ max: 40 })
    .withMessage('Password can contain max 40 characters'),
];

exports.updateUserSchema = [
  body('username')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 chars long'),
  body('role')
    .optional()
    .isIn([Role.Admin, Role.User])
    .withMessage('Invalid Role type'),
  body('password')
    .optional()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Password must contain at least 2 characters')
    .isLength({ max: 40 })
    .withMessage('Password can contain max 40 characters'),
  body()
    .custom((value) => {
      return !!Object.keys(value).length;
    })
    .withMessage('Please provide required field to update')
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = ['username', 'password', 'role'];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage('Invalid updates!'),
];

exports.validateLogin = [
  body('username')
    .exists()
    .withMessage('Username is required')
    .notEmpty()
    .withMessage('Username must be filled'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .notEmpty()
    .withMessage('Password must be filled'),
];
