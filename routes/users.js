const express = require('express');
const router = express.Router();

const User = require('../models/User')

router.get('/sign-in', (req, res) => res.render('signIn'));

router.get('/sign-up', (req, res) => res.render('signUp'));

router.post('/sign-up', (req, res) => {
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email} ,function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body , function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
    
});





//---------Login Handle----------//
router.post('/sign-in', (req, res) => {
    const { name, email, password } = req.body;
    //---------Checking user in database----------//
    User.findOne({
        email: email
    }).then(user => {
        if (!user) {
            let errors = [];
            errors.push({ msg: 'This email is not registered' });
            res.render('signIn', {
                errors,
                name,
                email
            });
        }



        //---------Redirect to dashboard----------//
        else {
            if(user.password != req.body.password){
                req.flash('success_msg','Invalid Username or Password');
                return res.redirect('back')
            }
            res.redirect(`/dashboard?user=${user.email}`);
        }
    });

});




//---------Logout Handle----------//
router.get('/logout', (req, res) => {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/sign-in');
});

module.exports = router;