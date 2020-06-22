import GoogleTokenStrategy from 'passport-google-id-token'
import { CLIENT_ID } from '../util/secrets'
import User from 'src/models/User'
import { nextTick } from 'async'

export const passportGoogleIdToken = () =>
  new GoogleTokenStrategy(
    {
      clientID: CLIENT_ID,
    },
    async function (parsedToken: any, googleId: any, done: any) {
      //Create newUser Account here
      const user = await User.findEmailandCreate(parsedToken)
      done(null, user)
    }
  )
