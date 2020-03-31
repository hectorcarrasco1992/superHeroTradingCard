const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./models/Users');
const flash = require('connect-flash')

const {
    register,
    updatePassword,
    updateProfile,
    renderRegister,
    renderHome,
    renderProfile,
    renderUpdatePage,
    userLogout


} = require('./userControllers/userController');
const userValidation = require('./utils/userValidation');

router.get('/logout', userLogout);
router.get('/register',renderRegister );
router.get('/update-profile', renderUpdatePage);
router.post('/register', userValidation,register);
router.get('/home',renderHome)
router.get('/profile',renderProfile)
router.put('/update-profile',(req, res, next) => {
  updateProfile(req.body, req.user._id)
    .then(user => {
      return res.redirect('/api/users/profile');
    })
    .catch(err => {
      console.log(err);
      return res.redirect('/api/users/update-profile');
    });
});
  
  router.get('/login', (req, res) => {
    return res.render('auth/login', { errors: req.flash('errors') });
  });
  
  //login routes
  router.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/api/users/home',
      failureRedirect: '/',
      failureFlash: true
    })
  );
  
  
  
  
  router.put('/update-profile', (req, res, next) => {
    updateProfile(req.body, req.user._id)
      .then(user => {
        return res.redirect('/api/users/profile');
      })
      .catch(err => {
        console.log(err);
        return res.redirect('/api/users/update-profile');
      });
  });
  
  
  router.put('/update-password',(req,res)=>{
   updatePassword(req.body,req.user._id)
    .then((user)=>{
      res.redirect('/api/users/profile')
    }).catch(err =>{
      console.log('hello')
      return res.redirect('/api/users/update-profile')
    })
  })

  module.exports = router;
  