const User = require('../models/Users');
const { validationResult } = require('express-validator');
const faker = require('faker');
const bcrypt = require('bcryptjs')
const passport = require('passport')
module.exports = {
  register: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    User.findOne({ email }).then(user => {
      if (user) {
        // return req.flash('errors', 'User Already Exists');
        return res.send('User Exists');
      } else {
        const newUser = new User();
        newUser.profile.name = name;
        newUser.profile.picture = faker.image.avatar();
        newUser.email = email;
        newUser.password = password;

        newUser
          .save()
          .then(user => {
            req.login(user, err => {
              if (err) {
                return res
                  .status(400)
                  .json({ confirmation: false, message: err });
              } else {
                return res.redirect('/api/users/home');
                next();
              }
            });
          })
          .catch(err => {
            return next(err);
          });
      }
    });
  },
  updateProfile: (params, id) => {
    const { name, email, address } = params;
    return new Promise((resolve, reject) => {
      User.findById(id)
        .then(user => {
          console.log('hello');
          if (name) user.profile.name = name;
          if (email) user.email = email;
          return user;
        })
        .then(user => {
          user.save().then(user => {
            resolve(user);
          });
        })
        .catch(err => reject(err));
    }).catch(err => reject(err));
  },

  updatePassword: (params,id)=>{
    return new Promise((resolve,reject)=>{
      User.findById(id)
      .then((user)=>{
        if(!params.oldPassword ||!params.newPassword || !params.repeatNewPassword){
          console.log('input empty')
          reject('All inputs must ve filled')
        }else if(params.newPassword !== params.repeatNewPassword){
          console.log('unmatch passwords')
          reject('new passwords do not match')
        }else{
          bcrypt.compare(params.oldPassword,user.password)
          .then((result)=>{
            if(result === false){
              console.log('yerr')
              reject('Old password incorrect')
            }else{
              console.log('new password')
              user.password = params.newPassword
              user.save().then(user =>resolve(user))

            }
          }).catch(err => {
            throw new Error(err)
          }).catch(err => reject(err))

        }
      })
    })
  },

  renderRegister: (req,res)=>{
      return res.render('auth/register',{errors:req.flash('errors')})
  },

  renderHome: (req,res,)=>{
      if(req.isAuthenticated()){
          return res.render('auth/home')
      }else return res.redirect('/')
  },

  renderUpdateProfile:(req, res) => {
    if (req.isAuthenticated()) {
      return res.render('auth/update-profile');
    }
    return res.redirect('/');
  }

}