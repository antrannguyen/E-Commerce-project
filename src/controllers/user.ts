import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export {}

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import { JWT_SECRET } from '../util/secrets'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'
import { createToken, verifyJWT, requireAdminandVerifyJWT } from './auth'

// GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    next(new NotFoundError('Users not found', error))
  }
}

// GET /products/:id
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user._id) {
      console.log('chek', req.user._id)
      const user = await User.findById(req.user._id).select([
        '-password',
        '-isAdmin',
        '-isBanned',
      ])
      console.log('res', user?._id)
      res.json(user)
    }
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

//POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password } = req.body
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(password, salt)

    //Create new user account
    await User.create(newUser)
    res.json(newUser)

    // Create the JWT
    const data = {
      newUser: {
        name: newUser.name,
        email: newUser.email,
        id: newUser.id,
        isAdmin: newUser.isAdmin,
      },
    }
    jwt.sign(
      data,
      JWT_SECRET,
      {
        expiresIn: '10000000h',
      },
      (error, token) => {
        if (error) throw console.log('jwt is wrong', error)
        console.log('token Normal', token)

        res.json({ token })
      }
    )
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
  await check('email', 'Email is not valid').isEmail()
  await check('password', 'Password is required').exists()
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid Credentials' }] })
    }
    //CompareJWT
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid email or password' }] })
    }
    //Create the JWT
    const data = {
      user: {
        email: user.email,
        id: user.id,
        isAdmin: user.isAdmin,
      },
    }
    jwt.sign(
      data,
      JWT_SECRET,
      {
        expiresIn: '10000000h',
      },
      (error, token) => {
        if (error) {
          throw console.log('jwt is wrong', error)
        }
        console.log('token Normal', token)
        res.json({ token })
      }
    )
  } catch (error) {
    next(new BadRequestError('Invalid email or password', error))
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
