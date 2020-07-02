import express from 'express'

import { verifyJWT, requireAdminandVerifyJWT } from '../controllers/auth'
import {
  findAll,
  createProduct,
  findById,
  updateProduct,
  deleteProduct,
  findByQuery,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/eCommerce/products prefix
router.get('/', findAll)
router.get('/:id', verifyJWT, findById)
router.get('/search/:query', findByQuery)
router.post('/', requireAdminandVerifyJWT, createProduct) //admin need token
router.put('/:id', requireAdminandVerifyJWT, updateProduct)
router.delete('/:id', requireAdminandVerifyJWT, deleteProduct)

export default router
