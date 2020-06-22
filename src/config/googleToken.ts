import GoogleTokenStrategy from 'passport-google-id-token'
import { CLIENT_ID } from '../util/secrets'
import User from '../models/User'

export const passportGoogleIdToken = () =>
  new GoogleTokenStrategy(
    {
      clientID: CLIENT_ID,
    },
    async function (parsedToken: any, googleId: any, done: any) {
      //Create newUser Account here
      const user = await User.findEmailandCreate(parsedToken.payload)
      done(null, user)
    }
  )
