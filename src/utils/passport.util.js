import { Strategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { UserModel } from '../database/modules/users.module.js';
import logger from '../utils/loggers.js';

passport.use(
  'signup',
  new Strategy(
    {
      passReqToCallback: true,
    },
    async (req, userName, password, done) => {
      try {
        const userExists = await UserModel.findOne({ userName });
        if (userExists) {
          return done(null, false);
        }
        const newUser = {
          userName,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          countryCode: req.body[countryCode],
          phone: req.body.phone,
          address: req.body.address,
          age: req.body.age,
          foto: req.body.foto,
        };

        const user = await UserModel.create(newUser);
        return done(null, user);
      } catch (error) {
        logger.log('error', error.message);
      }
    }
  )
);

passport.use(
  'login',
  new Strategy(async (userName, password, done) => {
    try {
      const user = await UserModel.findOne({ userName });
      if (!user) {
        done(null, false);
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        return done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      logger.log('error', error.message);
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, done);
});

export default passport;
