import express from 'express'
import passport from 'passport'

import {
  findAll,
  // findById,
  createUser,
  updateProfile,
  loginUser,
  logOutUser,
  forgetPassRequest,
} from '../controllers/user'
import {
  createToken,
  verifyJWT,
  requireAdminandVerifyJWT,
} from '../controllers/auth'
import {
  userValidationRules,
  validate,
  forgotPassValidate,
} from '../middlewares/validator'

const router = express.Router()

// Every path we define here will get /api/v1/eCommerce/users prefix
router.post(
  '/auth/google',
  passport.authenticate('google-id-token', { session: false }),
  createToken
)
router.get('/', verifyJWT, findAll)
router.post('/', createUser)
router.post('/login', validate(userValidationRules()), loginUser) // with email and pass
router.get('/logout', verifyJWT, logOutUser)
router.put(
  '/updateProfile',
  validate(userValidationRules()),
  verifyJWT,
  updateProfile
)
router.post('/forgot', validate(forgotPassValidate()), forgetPassRequest)
// router.put('/', changePass)
// router.put('/:id', banUser)

export default router
