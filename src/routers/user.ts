import express from 'express'
import { check } from 'express-validator/check'

import { registerUser } from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/eCommerce/users prefix
router.post(
  '/',
  [check('firstname', 'FirstName is required').notEmpty()],
  registerUser
)

export default router
