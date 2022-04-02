const joi = require("joi");

const validator = (req, res, next) => {
  const schema = joi.object({
    name: joi
      .string()
      .max(20)
      .min(3)
      .trim()
      .pattern(new RegExp("[a-zA-Z]"))
      .required()
      .messages({
        "string.min": "the name must contain more than 3 characters",
        "string.max": "The name must contain a maximum of 20 characters",
      }),

    lastName: joi
      .string()
      .max(20)
      .min(3)
      .trim()
      .pattern(new RegExp("[a-zA-Z]"))
      .required()
      .messages({
        "string.min": "Last name must contain more than 3 characters",
        "string.max": "The last name must contain a maximum of 20 characters",
      }),
    country: joi.string().pattern(new RegExp("[a-zA-Z]")).required(),
    image: joi.string(),
    email: joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "Wrong email format",
    }),
    password: joi
      .string()
      .pattern(new RegExp("[a-zA-Z0-9]"))
      .required()
      .trim()
      .min(8)
      .max(20)
      .messages({
        "string.min":
          "The password must contain at least 8 characters and contain uppercase, lowercase and number",
        "string.pattern":
          "The password must be alphanumeric and contain a number",
      }),

    from: joi.string(),
  });

  const validation = schema.validate(req.body.userData, { abortEarly: false });

  if (validation.error) {
    return res.json({
      success: false,
      from: "validator",
      message: validation.error.details,
      test: validation,
    });
  }

  next();
};

module.exports = validator;
