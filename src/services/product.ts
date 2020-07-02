import Product, { ProductDocument } from '../models/Product'

function findAll(): Promise<ProductDocument[]> {
  return Product.find().exec() // Return a Promise
}

function findByQuery(
  getQuery: Partial<ProductDocument>
): Promise<ProductDocument[]> {
  return Product.find(getQuery)
    .exec() // .exec() will return a true Promise
    .then((products) => {
      console.log('product Service', products)
      if (!products) {
        console.log('product Service2', products)

        throw new Error('Product not found')
      }
      return products
    })
}

function findById(id: string): Promise<ProductDocument> {
  return Product.findById(id)
    .exec() // .exec() will return a true Promise
    .then((id) => {
      if (!id) {
        throw new Error('Product not found')
      }
      return id
    })
}

function createProduct(newProduct: ProductDocument): Promise<ProductDocument> {
  return newProduct.save()
}

function updateProduct(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  return Product.findByIdAndUpdate(productId, update)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error('Product not found')
      }
      if (update.name) {
        product.name = update.name
      }
      if (update.category) {
        product.category = update.category
      }
      if (update.variant) {
        product.variant = update.variant
      }
      // const key = Object.keys(update)
      // key.forEach((key) => (product[key] = update[key]))
      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  findAll,
  findByQuery,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
}
