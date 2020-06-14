import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  isBanned: boolean;
}

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  firstname: {
    type: String,
    // required: true,
  },
  lastname: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
