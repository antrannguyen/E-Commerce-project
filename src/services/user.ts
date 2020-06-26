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

function updateOne(
  userID: string,
  update: Partial<UserDocument>
): Promise<UserDocument> {
  return User.findById(userID)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`ID ${userID} not found`)
      }

      if (update.name) {
        user.name = update.name
      }
      if (update.firstname) {
        user.firstname = update.firstname
      }
      if (update.lastname) {
        user.lastname = update.lastname
      }
      if (update.password) {
        user.password = update.password
      }
      if (update.email) {
        user.email = update.email
      }

      // Add more fields here if needed
      return user.save()
    })
}

export default {
  findAll,
  findById,
  create,
  findEmailandCreate,
  updateOne,
}
