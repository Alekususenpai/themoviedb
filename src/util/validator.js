const { check, oneOf, validationResult } = require('express-validator');
const app = require('../app');

const query = 'stranger';
const page = 1;
const language = 'en-EN';

//hypothetical eval of req params 
app.post('*', oneOf([
          check(query).isString(),
          check(page).isInt({ min: 1 }),
          check(language).matches(/[a-zA-Z]+-[a-zA-Z]+/i)
]), (req, res, next) => {
          try {
                    validationResult(req).throw();
          } catch (e) {
                    res.status(400).send('Validation failed');
          }
          next()
});