import express from 'express'

import { verifyJWT } from '../controllers/user'
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
router.get('/', verifyJWT, findAll)
router.get('/:id', findById)
router.get('/:search', findByQuery)
router.post('/', createProduct) //admin need token
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
