import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
  next();
};

export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { userName } = req.body;

  if (!email || !password || !userName) {
    res.status(422).send('You must provide email and password');
    next();
  }

  // find if user already exists
  User.find({ email }).limit(1).count((err, count) => {
    if (err) {
      console.log('herea');
      res.status(300).send('count of find failed');
      next();
    }

    if (count === 1) {
      res.status(409).send('User email already exists');
      next();
    } else {
      // create a new user and save
      const user = new User();
      user.email = email;
      user.password = password;
      user.userName = userName;

      user.save()
        .then((result) => {
          res.send({ token: tokenForUser(user) });
          next();
        })
        .catch((error) => {
          res.status(500).json({ error });
          next();
        });
    }
  });
};

export const profile = (req, res, next) => {
  User.findOne({ email: req.params.email }).then((user) => {
    res.send(user);
    next();
  })
    .catch((error) => {
      res.status(500).json({ error });
      next();
    });
};
