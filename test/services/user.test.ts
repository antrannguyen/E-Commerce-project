import User from '../../src/models/User'
import UserService from '../../src/services/user'
import * as dbHelper from '../db-helper'
import { createSecureServer } from 'http2'

async function create() {
  const newUser = new User({
    email: 'example@gmail.com',
    password: '12345678',
    firstname: 'an',
    lastname: 'tran',
    isAdmin: true,
  })
  return await UserService.create(newUser)
}

describe('user service', () => {
  beforeEach(async () => {
    // await dbHelper.connect()
    jest.setTimeout(10000)
  })
  afterEach(async () => {
    await dbHelper.clearDatabase()
  })
  afterAll(async () => {
    await dbHelper.closeDatabase()
  })
})

it('should find all user', async () => {
  const user = await create()
  const foundUser = await UserService.findAll()
  console.log('user', user)
  console.log('found', foundUser)

  expect(foundUser).resolves.toEqual(user)
})
