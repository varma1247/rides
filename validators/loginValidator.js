const Joi = require("@hapi/joi");
module.exports = {
  loginValidator: Joi.object({
    username: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})"))
      .message(
        "Invalid Username: minimum 8 chararcters with atleast 1 alphabet and 1 digit"
      )
      .empty()
      .alphanum()
      .min(8)
      .required()
      .messages({
        "string.base": "Username should be of type string",
        "string.alphanum":
          "Invalid Username (Special characters are not allowed)",
        "string.min": "Invalid Username (Minimun 8 characters)",
        "string.empty": "Username cannot be empty",
        "any.required": "Username is required",
      }),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
      .message(
        "Invalid Password: minimum 8 chararcters with atleast 1 lowercase, 1 uppercase and 1 digit"
      )
      .required()
      .empty()
      .messages({
        "string.base": "Password should be of type string",
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
      }),
  }),
};
