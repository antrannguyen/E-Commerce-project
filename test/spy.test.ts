const formUtils = {
  submitForm: function(formData: object) {
    console.log(formData)
  }
}

function productEditView(name: string, price: number, color: 'red' | 'blue') {
  const product = {
    name,
    price,
    color,
  }

  if (price > 0) {
    formUtils.submitForm(product)
  } else {
    throw new Error('Invalid form')
  }
}

const spy = jest.spyOn(formUtils, 'submitForm')

describe('product form submission', () => {
  beforeEach(() => {
    spy.mockClear()
  })

  it('should submit form successfully', () => {
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should submit form successfully', () => {
    productEditView('Galaxy s10', 1000, 'blue')

    expect(spy).toBeCalledWith(expect.objectContaining({
      name: 'Galaxy s10',
      price: 1000,
      color: 'blue',
    }))
  })

  it('should not submit form with invalid price', () => {
    const func = () => productEditView('Galaxy s10', -10, 'blue')
    expect(func).toThrow(new Error('Invalid form'))
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
