import User, { UserDocument } from '../models/User'

function findAll(): Promise<UserDocument[]> {
  return User.find().exec() // Return a Promise
}

function findById(id: string): Promise<UserDocument> {
  console.log('servoce', id)
  return User.findById(id)
    .exec() // .exec() will return a true Promise
    .then((id) => {
      if (!id) {
        throw new Error(`User ${id} not found`)
      }
      return id
    })
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
  const user = await User.findOne({ email: payload.email }).exec()

  if (user) {
    return user
  } else {
    return createUserByGoogleAcount(payload)
  }
}

export default {
  findAll,
  findById,
  create,
  findEmailandCreate,
}
