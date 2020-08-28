const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("./models/user");

passport.use(
  "sign-up",
  new LocalStrategy((username, password, done) => {
    bcrypt.hash(password, 10).then((hash) => {
      return User.create({
        username,
        passwordHash: hash,
      })
        .then((user) => {
          done(null, user);
        })
        .catch((error) => {
          done(error);
        });
    });
  })
);

passport.use(
  "sign-in",
  new LocalStrategy({}, (username, password, done) => {
    let user;
    User.findOne({ username })
      .then((document) => {
        if (!document) {
          return Promise.reject("Cannot find that user");
        } else {
          user = document;
          return bcrypt.compare(password, user.passwordHash);
        }
      })
      .then((result) => {
        if (result) {
          done(null, user);
        } else {
          return Promise.reject("Incorrect password");
        }
      })
      .catch((error) => {
        done(error);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});
