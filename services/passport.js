require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
// const User = require('../models/User')

// passport.serializeUser((user, done) => done(null, user.id))
// passport.deserializeUser((id, done) => User.findById(id).then((user) => done(null, user)))

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile)
      // User.findOne({ googleID: profile.id }).then((existingUser) => {
      //   if (existingUser) {
      //     done(null, existingUser)
      //   } else {
      //     new User({ googleID: profile.id }).save().then((user) => done(null, user))
      //   }
      // })
    }
  )
)
