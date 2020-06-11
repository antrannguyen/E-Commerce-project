import express from 'express'

import {
  create,
  findById,
  deleteMovie,
  findAll,
  updateMovie,
} from '../controllers/movie'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:movieId', findById)
router.put('/:movieId', updateMovie)
router.delete('/:movieId', deleteMovie)
router.post('/', create)

export default router
