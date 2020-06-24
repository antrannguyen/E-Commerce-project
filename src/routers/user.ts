import express from 'express'
import passport from 'passport'

import {
  findAll,
  findById,
  createUser,
  loginUser,
  logOutUser,
} from '../controllers/user'
import { createToken } from '../controllers/auth'
import { verifyJWT, requireAdminandVerifyJWT } from '../controllers/auth'
import { userValidationRules, validate } from '../middlewares/validator'

const router = express.Router()

// Every path we define here will get /api/v1/eCommerce/users prefix
router.get('/', verifyJWT, findAll)
router.get('/:id', verifyJWT, findById)
router.post('/', createUser)
router.post('/login', validate(userValidationRules()), loginUser) // with email and pass
router.post('/login', logOutUser) // with email and pass
router.post(
  '/auth/google',
  passport.authenticate('google-id-token', { session: false }),
  createToken
)

// router.post('/logOutGoogle', logoutUser) // do this with Google
// router.put('/updateProfile', updateProfile)
// router.post('/', forgetPassRequest)
// router.put('/', changePass)
// router.put('/:id', banUser)

export default router
