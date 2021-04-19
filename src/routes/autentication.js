const express = require("express");
const router = express.Router();
const passport = require("passport")

router.get("/signup",(req,res)=>{
    res.render("signup");
});

router.post("/signup", passport.authenticate("local.signup",{
    successRedirect:"/profile",
    failureRedirect:"/signin"
}))

router.get("/signin",(req,res)=>{
    res.render("signup")
})

router.post("/signin", passport.authenticate("local.signup",{
    successRedirect:"/profile",
    failureRedirect:"/signup"
}))






router.post("/signin", (req,res,next)=>{
    passport.authenticate("local.signin",{
        successRedirect:"/profile",
        failureRedirect:"/signin"
    })(req,res,next);
});




router.get("/profile",(req,res)=>{
    res.render("profile");
})

router.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/');
});



module.exports = router;