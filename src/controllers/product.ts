import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductService from '../services/product'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'

// GET /products
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findAll())
  } catch (error) {
    next(new NotFoundError('Products not found', error))
  }
}

export const findByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query
    // const getQuery = await Product.find({ id: query })
    res.json(await ProductService.findByQuery(query))
  } catch (error) {
    next(new NotFoundError('Products not found', error))
  }
}

// GET /products/:id
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findById(req.params.id))
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

//POST /products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, variant } = req.body

    const foundName = await Product.findOne({ name: req.body.name })
    if (!foundName) {
      const newProduct = new Product({
        name,
        category,
        variant,
      })
      await ProductService.createProduct(newProduct)
      res.json(newProduct)
    } else {
      res.json(`The name ${req.body.name} created, please choose other name`)
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else if (error.name === 'UnauthorizedError') {
      next(new UnauthorizedError('Unauthorized Error', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// PUT /products/:id
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.id
    const productUpdate = await ProductService.updateProduct(productId, update)
    res.json(productUpdate)
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

// DELETE /products/:id
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductService.deleteProduct(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}
