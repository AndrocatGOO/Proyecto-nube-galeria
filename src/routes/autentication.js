const express = require("express");
const router = express.Router();
const passport = require("passport")                    //LOGEO FRAMEWORK
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');                  //



//!!!!!!!!!!!!     REGISTRAR     !!!!!!!!!!!!

router.get("/signup",isNotLoggedIn,(req,res)=>{
    res.render("signup");
});


router.post("/signup",isNotLoggedIn, passport.authenticate("local.signup",{
    successRedirect:"/profile",
    failureRedirect:"/signin"
}));



//!!!!!!!!!!!!     INGRESAR     !!!!!!!!!!!!

router.get("/signin",isNotLoggedIn,(req,res)=>{
    res.render("signup")
    console.log("renderisando login desde signin");
});


router.post("/signin", isNotLoggedIn,(req,res,next)=>{
    passport.authenticate("local.signin",{
        successRedirect:"/profile",
        failureRedirect:"/signin"
    })(req,res,next);
});




//!!!!!!!!!!!!     DESLOGEO     !!!!!!!!!!!!

router.get('/logout',isLoggedIn, (req, res)=>{
    req.logOut();
    res.redirect('/index');
});



module.exports = router;
