import User, { UserDocument } from '../models/User'

function findAll(): Promise<UserDocument[]> {
  return User.find().exec() // Return a Promise
}

function create(newUser: UserDocument): Promise<UserDocument> {
  return newUser.save()
}

function createUserByGoogleAcount(
  payload: Partial<UserDocument>
): UserDocument {
  const { name, email } = payload

  const newUser = new User({
    name,
    email,
  })
  newUser.save()
  return newUser
}

async function findEmailandCreate(
  payload: Partial<UserDocument>
): Promise<UserDocument> {
  const user = await User.findOne(payload.email).exec()

  if (user) {
    return user
  } else {
    return createUserByGoogleAcount(payload)
  }
}

export default {
  findAll,
  create,
  findEmailandCreate,
}
