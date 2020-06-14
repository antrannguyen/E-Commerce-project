import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'
import { any } from 'bluebird'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    console.log('body', req.body)
    res.send('work?')
    if (!errors.isEmpty()) {
      return next(res.status(400).json({ errors: errors.array() }))
    }
    res.json(await UserService.findAll())
  } catch (error) {
    // const errors = validationResult(req)
    // if (!errors.isEmpty() ){
    //   // next(new BadRequestError('Invalid Request', error))
    //   return res.status(400).json({errors: errors.array()})
    // }
    next(new NotFoundError('Users not found', error))
  }
}
