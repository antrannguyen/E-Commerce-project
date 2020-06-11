import express from 'express'

import {
  findAll,
  createProduct,
  findById,
  updateProduct,
  deleteProduct,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.get('/', findAll)
router.post('/', createProduct)
router.get('/:id', findById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
