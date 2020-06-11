import express from 'express'

import {
  findAll,
  createProduct,
  findById,
  updateProduct,
  deleteProduct,
  findByQuery,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/eCommerce prefix
router.get('/products', findAll)
router.post('/products', createProduct)
router.get('/products/search', findByQuery)
router.get('/products/:id', findById)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router
