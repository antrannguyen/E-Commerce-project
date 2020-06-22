import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser, { json } from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import bluebird from 'bluebird'
import morgan from 'morgan'
import cors from 'cors'

import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

import movieRouter from './routers/movie'
import eCommerceRouter from './routers/eCommerce'
import userRouter from './routers/user'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

import { passportGoogleIdToken } from './config/googleToken'

const app = express()
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// Express configuration
app.set('port', process.env.PORT || 3000)

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors())
app.use(
  morgan((tokens: any, req: any, res: any) => {
    return [
      tokens.method(req, res),
      ' ',
      tokens.url(req, res),
      ' ',
      tokens.status(req, res),
      ' ',
      tokens.res(req, res, 'content-length'),
      ' - ',
      tokens['response-time'](req, res),
      'ms ',
      JSON.stringify(req.body),
    ].join('')
  })
)

passport.use(passportGoogleIdToken())

// Use MOVIE router
app.use('/api/v1/movies', movieRouter)
// Use PRODUCT router
app.use('/api/v1/eCommerce/products', eCommerceRouter)
// Use USER router
app.use('/api/v1/eCommerce/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
