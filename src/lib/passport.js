const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');


//login

passport.use("local.signin", new LocalStrategy({
    usernameField:"UserName",
    passwordField:"password",
    passReqToCallback: true
},async(req,UserName,password, done)=>{
    console.log(req.body);
    const rows = await pool.query(`SELECT * FROM user WHERE username='${UserName}';`);
    if (rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.mathPassword(password, user.password);
        if (validPassword){
            done(null,user);
        }else{
            done(null,false);
        }
    }else{
        return done(null,false);
    }
}));


//register
passport.use("local.signup", new LocalStrategy({
    usernameField:"UserName",
    passwordField:"password",
    passReqToCallback: true
},async(req,UserName,password, done)=>{
    const{ email }=req.body;
    const newUser={
        UserName,
        password
    };
    password = newUser.password = await helpers.encryptPassword(password);

    const result = await pool.query(`INSERT INTO user (email, username, password) values ('${email}','${UserName}','${password}');`);
    newUser.id= result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query(`SELECT * FROM user WHERE id='${id}';`)
    done(null, rows[0]);
})