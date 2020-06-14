import express from 'express'
import { check, validationResult } from 'express-validator'

import { registerUser } from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/eCommerce/users prefix
router.post('/', [check('email', 'Email is required').isEmail()], registerUser)

export default router
