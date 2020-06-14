import User, { UserDocument } from '../models/User'

function findAll(): Promise<UserDocument[]> {
  return User.find().exec() // Return a Promise
}

export default {
  findAll,
}
