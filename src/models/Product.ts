import mongoose, { Document } from 'mongoose'

export type Category = {
  gender: string[]
  categoryOfClothes: string[]
}

export type Variant = {
  size: string[]
  color: string[]
}

export type ProductDocument = Document & {
  id: string
  name: string
  category: Category
  variant: Variant
}

const productSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  category: {
    gender: {
      type: [String],
    },
    categoryOfClothes: {
      type: [String],
    },
  },
  variant: {
    size: {
      type: [String],
    },
    color: {
      type: [String],
    },
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
