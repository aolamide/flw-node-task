/**
 * 
 * @param {"success" |  "error"} status The status of the response 
 * @param {string} message  Apt response message
 * @param {*} data actual response data
 * @returns {Object}
 */
const responseObject = (status, message, data) => ({
  message,
  status,
  data
})


/**
 * 
 * @param {String} condition The condition to use for validating the rule.
 * @param {*} condition_value The condition value to run the rule against.
 * @param {*} field_value The field to validate the rule against
 * @returns {Boolean}
 */
const validateValues = (condition, condition_value, field_value) => {
  let validated;

  switch(condition) {
    case 'eq' :
      validated = condition_value == field_value;
      break;
    case 'neq' :
      validated = condition_value != field_value;
      break;
    case 'gt' :
      validated = field_value > condition_value;
      break;
    case 'gte' :
      validated = field_value >= condition_value;
      break;
    case 'contains' :
      validated = field_value.includes(condition_value);
      break;
    default :
    validated = false
  }

  return validated
}

const myDetails = {
  name: 'Olamide Aboyeji',
  github: '@aolamide',
  email : 'me@aolamide.tech',
  mobile : '08087723258',
  twitter : '@olamideaboyeji'
}

module.exports.responseObject= responseObject
module.exports.validateValues= validateValues
module.exports.myDetails= myDetails