const { validateValues, responseObject } = require("./helpers");

const validationController = (req, res) => {
  const { rule : {condition, condition_value, field} , data } = req.body;

  //get field value
  const field_value = data[field];

  //validate the field value with the condition value using the condition
  const validated = validateValues(condition, condition_value, field_value);

  let responseData = {
    validation : {
      error : !validated,
      field,
      field_value,
      condition,
      condition_value
    }
  };

  //If validation is successful, return success response, else return error response
  if(validated) {
    let response = responseObject('success', `field ${field} successfully validated.`, responseData);
    return res.json(response);
  } 
  else {
    let response = responseObject('error', `field ${field} failed validation.`, responseData);
    return res.status(400).json(response);
  }
}


module.exports = validationController