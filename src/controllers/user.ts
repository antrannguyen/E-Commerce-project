import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt-nodejs'

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'
import { any } from 'bluebird'

// GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('heare')
    res.json(await UserService.findAll())
  } catch (error) {
    next(new NotFoundError('Users not found', error))
  }
}

//POST /users  -  with schema validation
// normal way create with email and pass
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password, isAdmin, isBanned } = req.body
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      isAdmin,
      isBanned,
    })

    // ??? This is throw error “No callback function was given”, T_T
    // bcrypt.genSalt(10, (err, salt) => {

    //   bcrypt.hash(newUser.password, salt, (err, hash) => {
    //     if (err) {
    //       console.log('e', err)
    //       throw err
    //     }
    //     newUser.password = hash
    //     newUser
    //       .save()
    //       .then((user) => res.json(user))
    //       .catch((err) => console.log('e2', err))
    //   })
    // })

    await User.create(newUser)
    res.json(newUser)
  } catch (error) {
    if (error.keyPattern) {
      next(new BadRequestError('Email already exists', error))
    }
    if (error.errors.password.message) {
      next(new BadRequestError('Minimum of pass letter is 8', error))
    }
    console.log('seeme', error.errors.email.message)
    if (error.errors.email.message) {
      next(new BadRequestError('Invalid Emal', error))
    }
    next(new BadRequestError('Input is not correct', error))
  }
}

// POST /users/login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('email', 'Email is not valid').isEmail().run(req)
  await check('password', 'Minimum of pass letter is 8')
    .isLength({ min: 8 })
    .run(req)
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    return res.send(req.body)
  } catch (error) {
    next(new BadRequestError('Duplicate email', error))
  }
}

// POST /users/logout
export const logOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('email', 'Email is not valid').isEmail().run(req)
  await check('password', 'Minimum of pass letter is 8')
    .isLength({ min: 8 })
    .run(req)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  return res.send(req.body)
}

// GET /auth/google
export const createToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('abc')
    console.log('user', req.user)
    res.send(req.user ? 200 : 401)
  } catch (error) {
    next(new BadRequestError('Duplicate email', error))
  }
}
