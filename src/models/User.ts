import mongoose, { Document } from 'mongoose'
import { isEmail } from 'validator'
import bcrypt from 'bcrypt'

export type UserDocument = Document & {
  id: string;
  name: string;
  password: string;
  email: string;
  isAdmin: boolean;
  isBanned: boolean;
  // passwordConfirmation: String
  // comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email is required'],
      lowercase: true,
      //this is the other validate way with mongoose, i just wanna try it, but i apply express validator
      validate: { validator: isEmail, message: 'Invalid email' },
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

// userSchema.methods.comparePassword = function (
//   candidatePassword: string
// ): Promise<boolean> {
//   const password = this.password
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, password, (err: any, success: any) => {
//       if (err) return reject(err)
//       return resolve(success)
//     })
//   })
// }

export default mongoose.model<UserDocument>('User', userSchema)
