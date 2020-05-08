const Joi = require("@hapi/joi");
const { registrationValidator } = require("./registrationValidator");
const { loginValidator } = require("./loginValidator");
const { postValidator } = require("./postValidator");
const { commentValidator } = require("./commentValidator");
module.exports = {
  registrationValidator: registrationValidator,
  loginValidator: loginValidator,
  postValidator: postValidator,
  commentValidator: commentValidator
};
