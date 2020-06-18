import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export const userValidationRules = () => {
  return [
    // must have an email
    body('email').isEmail(),
    //pass at least 8 chars long
    body('password').isLength({ min: 8 }),
  ]
}

export const validate = (validations: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation: any) => validation.run(req)))
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    res.status(422).json({ errors: errors.array() })
  }
}
