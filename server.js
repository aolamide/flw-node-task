const express = require('express');
const { responseObject, myDetails } = require('./utils/helpers');
const validationController = require('./utils/validator.controller');
const validateMiddleware = require('./utils/validator.middleware');

const app = express();

//handle invalid JSON payload
app.use((req, res, next) => {
  express.json()(req, res, err => {
    if (err) {
      let response = responseObject('error', 'Invalid JSON payload passed.', null);
      return res.status(400).json(response);
    }
    next();
  });
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  let response = responseObject('success', 'My Rule-Validation API', myDetails);
  return res.json(response);
});

app.post('/validate-rule', ...validateMiddleware, validationController);

let server = app.listen(PORT, () => {
  console.log('Server listening on PORT ' + PORT);
});

module.exports = server;