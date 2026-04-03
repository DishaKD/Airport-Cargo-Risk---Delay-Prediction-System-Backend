import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      res.status(400).json({
        success: false,
        message: "Validation error",
        error: messages,
      });
      return;
    }

    req.body = value;
    next();
  };
};
