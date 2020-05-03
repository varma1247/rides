const Joi = require("@hapi/joi");
module.exports = {
  userValidator: Joi.object({
    username: Joi.string().empty().alphanum().min(8).required().messages({
      "string.base": "Username should be of type string",
      "string.alphanum": "Invalid Username (Must be AlphaNumeric)",
      "string.min": "Invalid Username (Minimun 8 characters)",
      "string.empty": "Username cannot be empty",
      "any.required": "Username is required",
    }),
    email: Joi.string()
      .pattern(new RegExp("@mavs.uta.edu$"))
      .message("Invalid email (Enter valid UTA email id)")
      .required()
      .empty()
      .messages({
        "string.base": "Email should be of type string",
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
      }),
  }),
};
