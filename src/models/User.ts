import mongoose, { Document } from 'mongoose'
// import { isEmail } from 'validator'

export type UserDocument = Document & {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  isAdmin: boolean;
  isBanned: boolean;
}

// export type Validator = {
//   isEmail: boolean
//   message: string
// }

// const validate: Validator = { validator: isEmail, message: 'Invalid email' }

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email is required'],
      lowercase: true,
      //this is the other validate way with mongoose, i just wanna try it, but i apply express validator
      // validate: { validator: isEmail, message: 'Invalid email' },
      // validate: [isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      minlength: [8, 'Minimum of letter is 8'],
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
