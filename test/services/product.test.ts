import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import * as dbHelper from '../db-helper'

// const nonExistingProductId = '5e57b77b5744fa0b461c7906'
const nonExistingProductId = '5ee1337ba4538021340e7d97'

async function createProduct() {
  const product = new Product({
    name: 'T-Shirt',
    category: { gender: ['boy'], categoryOfClothes: ['T-Shirt'] },
    variant: { size: ['5 years old'], color: ['white'] },
  })
  return await ProductService.createProduct(product)
}

describe('product service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('id')
    expect(product).toHaveProperty('name', 'T-Shirt')
    expect(product).toHaveProperty(
      'category',
      expect.objectContaining({
        gender: expect.arrayContaining(['boy']),
        categoryOfClothes: expect.arrayContaining(['T-Shirt']),
      })
    )
    expect(product).toHaveProperty(
      'variant',
      expect.objectContaining({
        size: expect.arrayContaining(['5 years old']),
        color: expect.arrayContaining(['white']),
      })
    )
  })

  it('should get all products', async () => {
    const product = await createProduct()
    const foundProduct = await ProductService.findAll()
    expect(foundProduct).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __v: product.__v,
          _id: product._id,
          name: product.name,
          variant: expect.objectContaining({
            color: expect.arrayContaining(['white']),
            size: expect.arrayContaining(['5 years old']),
          }),
          category: expect.objectContaining({
            categoryOfClothes: expect.arrayContaining(['T-Shirt']),
            gender: expect.arrayContaining(['boy']),
          }),
        }),
      ])
    )
  })

  it('should get products by query', async () => {
    const product = await createProduct()
    const foundProduct = await ProductService.findByQuery({ name: 'T-Shirt' })
    expect(foundProduct).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __v: product.__v,
          _id: product._id,
          name: 'T-Shirt',
          variant: expect.objectContaining({
            color: expect.arrayContaining(['white']),
            size: expect.arrayContaining(['5 years old']),
          }),
          category: expect.objectContaining({
            categoryOfClothes: expect.arrayContaining(['T-Shirt']),
            gender: expect.arrayContaining(['boy']),
          }),
        }),
      ])
    )
  })

  it('should not get a non-existing product query', async () => {
    expect.assertions(1)
    return ProductService.findByQuery({ name: 'T-Shirt1' }).catch((e) => {
      expect(e.message).toMatch('Product not found')
    })
  })

  it('should get a product with id', async () => {
    const product = await createProduct()
    const foundProduct = await ProductService.findById(product._id)
    expect(foundProduct._id).toEqual(product._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing product', async () => {
    expect.assertions(1)
    return ProductService.findById(nonExistingProductId).catch((e) => {
      expect(e.message).toMatch('Product not found')
    })
  })

  it('should update an existing product', async () => {
    const product = await createProduct()

    const update = {
      name: 'T-Shirt',
      category: { gender: ['girl'], categoryOfClothes: ['T-Shirt1'] },
      variant: { color: ['red'], size: ['S'] },
    }
    const updated = await ProductService.updateProduct(product._id, update)
    expect(updated).toHaveProperty('_id', product._id)
    expect(updated.category.gender).toContain('girl')
    expect(updated.name).toBe(update.name)
    expect(updated.variant.size).toContain('S')
    expect(updated.variant.color).toContain('red')
  })

  it('should not update a non-existing product', async () => {
    expect.assertions(1)
    const update = {
      name: 'Shrek',
      publishedYear: 2001,
    }
    return ProductService.updateProduct(nonExistingProductId, update).catch(
      (e) => {
        expect(e.message).toMatch('Product not found')
      }
    )
  })

  it('should delete an existing movie', async () => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService.deleteProduct(product.id)
    return ProductService.findById(product.id).catch((e) => {
      expect(e.message).toBe('Product not found')
    })
  })
})
