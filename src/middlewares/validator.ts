import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export const userValidationRules = () => {
  return [
    // must have an email
    body('email', 'Email is not valid').isEmail(),
    //must have password
    body('password', 'Minimum of pass letter is 8').exists(),
  ]
}

export const forgotPassValidate = () => {
  return [
    // must have an email
    body('email', 'Email is not valid').isEmail(),
    //must have password
    body('email', 'Please enter a valid email address').exists(),
  ]
}

export const userValidationRegisterUser = () => {
  return [
    // must have an email
    body('email', 'Email is not valid').isEmail(),
    //must have password
    body('password', 'Password is required').exists(),
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
