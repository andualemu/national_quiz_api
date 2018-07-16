/* eslint consistent-return: 0 */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create a PostSchema with a title field
const UserSchema = new Schema({
  userName: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  bio: [String],
  math: [String],
});

UserSchema.set('toJSON', {
  virtuals: true,
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;

  // Load hash from your password DB.
  // bcrypt.hash(user.password, 10, (err, hash) = {
  //   if(err) {}
  //
  // });
  console.log(`password: ${candidatePassword}`);
  bcrypt.compare(candidatePassword, user.password, (err, res) => {
    if (err) return callback(err);
    return callback(null, res);
  });
  // return callback(null, comparisonResult) for success
  // or callback(error) in the error case
};

UserSchema.pre('save', function beforeUserModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      // Store hash in your password DB.
      console.log(`uhhashed password: ${user.password}`);
      user.password = hash;
      return next();
    });
  });
  // when done run the next callback with no arguments
  // call next with an error if you encounter one
});

// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);


export default UserModel;
