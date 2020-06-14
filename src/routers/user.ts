import express from 'express'
import {check} = require('express-validator/check')


import { registerUser } from '../controllers/user'
import { any } from 'bluebird'

const router = express.Router()

// Every path we define here will get /api/v1/eCommerce/users prefix
router.post(
  '/',
  [check("firstname", 'FirstName is required', "an").notEmpty()],
  registerUser
)

export default router
