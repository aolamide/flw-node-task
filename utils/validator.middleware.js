const  { oneOf, validationResult, body } = require('express-validator');
const { responseObject } = require('./helpers');

/**
 * Check if variable is an actual object, and not an array, null or any other typeof object 
 * @param {*} value The value to check
 */
const isObject = value => {
  if(Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }
  return true;
}

//validation rules
const validationRules = () => [
  //cehcek is rule exists and is an object
  body('rule')
  .exists().withMessage('rule is required.')
  .custom(isObject).withMessage('rule should be an object.'),

  //check if condition_value exists
  body('rule.condition_value')
  .exists().withMessage('condition_value is required.'),

  //check if a valid condition is passed
  body('rule.condition')
  .exists().withMessage('condition is required.')
  .isString().withMessage('condition should be a string.')
  .isIn(['eq', 'neq', 'gt', 'gte', 'contains']).withMessage('Invalid condition passed. Accepted values are "eq", "neq", "gt", "gte", and "contains".'),

  //check if field exists
  body('rule.field')
  .exists().withMessage('field is required.'),
  
  //check if data is an object, array or string
  oneOf([
    body('data').isString(),
    body('data').custom(isObject),
    body('data').isArray()
  ], 'data should be a string, object or array.'),

  //check if the field specified in the rule object is missing from the data passed
  body('data')
 .custom((value, { req }) => {
   let field = req.body.rule.field;
   if(value[field]) return true;
   throw new Error(`field ${field} is missing from data.`)
  })
];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
      return next();
  }
  //Extract errors and return first error
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push(err.msg));
  let response = responseObject('error', extractedErrors[0], null);
  return res.status(400).json(response);
}


const validateMiddleware = [validationRules(), validate];

module.exports = validateMiddleware;