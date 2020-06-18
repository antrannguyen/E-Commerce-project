import User, { UserDocument } from '../models/User'

function findAll(): Promise<UserDocument[]> {
  return User.find().exec() // Return a Promise
}

function create(newUser: UserDocument): Promise<UserDocument> {
  return newUser.save()
}

export default {
  findAll,
  create,
}
