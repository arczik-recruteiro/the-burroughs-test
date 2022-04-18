import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

export function validateUuidPathVariable(name: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const desiredParam = req.params[name];

    if (typeof desiredParam === 'undefined' || desiredParam === null) {
      return res
        .status(400)
        .send({ errors: [{ msg: `Lack of param "${name}"` }] });
    }

    if (!validate(desiredParam)) {
      return res
        .status(400)
        .send({ errors: [{ msg: `Invalid param "${name}"` }] });
    }

    next();
  };
}
