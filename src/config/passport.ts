import passport from 'passport'
import passportLocal from 'passport-local'
import passportFacebook from 'passport-facebook'

import { Request, Response, NextFunction } from 'express'

const LocalStrategy = passportLocal.Strategy
const FacebookStrategy = passportFacebook.Strategy
