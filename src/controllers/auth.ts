import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

import User, { UserDocument } from '../models/User'
import { UnauthorizedError } from '../helpers/apiError'

// GET /auth/google
export const createToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('user', req.user)

    const { name, email, id, isAdmin } = req.user as UserDocument
    const data = {
      name,
      email,
      id,
      isAdmin,
    }
    const token = await jwt.sign(
      data,
      JWT_SECRET,
      {
        expiresIn: '10000000h',
      },
      (error, token) => {
        if (error) throw error
        res.json({ token })
      }
    )
    res.json({ token })
    res.send(token)
  } catch (error) {
    next(new UnauthorizedError('Unauthorized Request', error))
  }
}

// GET /auth/google
export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get token from the headers
  // const token = req.header('x-auth-token')
  const token = req.headers['authorization']?.replace('Bearer ', '') || ''
  if (!token) {
    return new UnauthorizedError('No token, authorization denied', error)
  }
  try {
    //Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as UserDocument
    const user = await User.findOne(decoded.email)
    req.user = user as UserDocument
    next()
  } catch (error) {
    next(new UnauthorizedError('Token is not valid', error))
  }
}

// requireAdminandVerifyJWT
export const requireAdminandVerifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.replace('Bearer ', '') || ''
  if (!token) {
    return new UnauthorizedError('No token, authorization denied', error)
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserDocument
    const user = await User.findOne({ email: decoded.email })
    const checkAdmin = decoded.isAdmin
    if (checkAdmin) {
      req.user = user as UserDocument
    }
    next()
  } catch (error) {
    next(new UnauthorizedError('Only admin can do this action', error))
  }
}
