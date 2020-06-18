import express from 'express'
import { findAll, createUser, loginUser, logOutUser } from '../controllers/user'
// import { createUser1 } from '../controllers/testwithJS.js'

const router = express.Router()

//<-----Please ignore, I just want to try with express validator
// import { userValidationRules, validate } from '../middlewares/validator'
// router.post('/', validate(userValidationRules()), createUser)
// ---->

// Every path we define here will get /api/v1/eCommerce/users prefix
router.get('/', findAll)
router.post('/', createUser)
router.post('/login', loginUser) // with email and pass
router.post('/login', logOutUser) // with email and pass

// router.get('/:id', findById)
// router.post('/googleLogin', loginUserWithGoogle) // do this with Google
// router.post('/logOutGoogle', logoutUser) // do this with Google

// router.put('/updateProfile', updateProfile)
// router.post('/', forgetPassRequest)
// router.put('/', changePass)
// router.put('/:id', banUser)

export default router
