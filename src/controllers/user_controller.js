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
};

export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  console.log('herea');
  if (!email || !password) {
    res.status(422).send('You must provide email and password');
  }

  // find if user already exists
  User.find({ email }).limit(1).count((err, count) => {
    if (err) res.status(300).send('count of find failed');

    if (count === 1) {
      res.status(409).send('User email already exists');
    } else {
      // create a new user and save
      const user = new User();
      user.email = email;
      user.password = password;

      user.save()
        .then((result) => {
          res.send({ token: tokenForUser(user) });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  });
};
