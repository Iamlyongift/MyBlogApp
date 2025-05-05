import Joi from "joi";

export const RegisterSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("confirm_password")
    .messages({ "any.only": "{{#label}} does not match" }),
  phone_number: Joi.string().required(),
  country: Joi.string().required(),
   role: Joi.string(),
});

export const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const option = {
  abortearly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
