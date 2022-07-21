import Joi from '@hapi/joi';
export const newUserValidator = (req, res,next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().min(4).required(),
    email: Joi.string().required(),
    password: Joi.string().min(4).required()

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const notesValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().required(),
    Descreption: Joi.string().required(),
    color: Joi.string().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`,
    });
  } else {
    req.validatedBody = value;
    next();
  }
};