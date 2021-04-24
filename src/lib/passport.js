const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');



//!!!!!!!!!!!!     LOGIN     !!!!!!!!!!!!

passport.use("local.signin", new LocalStrategy({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback: true
},async(req,username,password, done)=>{
    const rows = await pool.query(`SELECT * FROM user WHERE username='${username}';`);
    if (rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.mathPassword(password, user.password);
        if (validPassword){
            console.log("bienbenido "+username);
            done(null,user);
        }else{
            console.log("la contraseña del usuario "+username+" no es correcta.");
            done(null,false);
        }
    }else{
        console.log("el usuario no existe");
        return done(null,false);
    }
}));



//!!!!!!!!!!!!     REGISTER     !!!!!!!!!!!!

passport.use("local.signup", new LocalStrategy({
    usernameField:"UserName",
    passwordField:"password",
    passReqToCallback: true
},async(req,UserName,password, done)=>{
    const{ email }=req.body;
    const newUser={
        UserName,
        password,
        email
    };
    const usuarios = await pool.query(`SELECT * FROM user WHERE username='${UserName}';`)
    console.log(usuarios);
    if (usuarios.length > 0){
        done(null,false);
    }else{
        password = newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query(`INSERT INTO user (email, username, password) values ('${email}','${UserName}','${password}');`);
    console.log(result);
    const result_2 = await pool.query(`INSERT INTO profile (user_id, username) values ('${result.insertId}','${UserName}');`);
    const user = await pool.query(`SELECT * FROM user WHERE username='${UserName}';`);
    console.log(result_2);
    serialize = user[0];
    done(null, serialize);
    }
}));





passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query(`SELECT * FROM user WHERE id='${id}';`);
    done(null, rows[0]);

})