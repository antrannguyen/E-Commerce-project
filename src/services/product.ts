import Product, { ProductDocument } from '../models/Product'

function findAll(): Promise<ProductDocument[]> {
  return Product.find().exec() // Return a Promise
}

function findById(id: string): Promise<ProductDocument> {
  return Product.findById(id)
    .exec() // .exec() will return a true Promise
    .then((id) => {
      if (!id) {
        throw new Error(`Product ${id} not found`)
      }
      return id
    })
}

function createProduct(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

function updateProduct(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  return Product.findByIdAndUpdate(productId, update)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      if (update.name) {
        product.name === update.name
      }
      if (update.category) {
        product.category === update.category
      }
      if (update.variant) {
        product.variant === update.variant
      }
      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  findAll,
  createProduct,
  findById,
  updateProduct,
  deleteProduct,
}
