import jwt from 'jsonwebtoken'
import { SESSION_SECRET } from '../util/secrets'
import user from 'src/services/user'

export type Data = {
  name: string;
  email: string;
  isAdmin: boolean;
}

const data: Data = { name: user.name, email: user.email, isAdmin: user.isAdmin }

const createJWT = jwt.sign(data, SESSION_SECRET, { expiresIn: '1h' })

const verifyJWT = jwt.verify(createJWT, SESSION_SECRET)

const checkAdmin: boolean = verifyJWT.isAdmin

export default {
  createJWT,
  verifyJWT,
  checkAdmin,
}
