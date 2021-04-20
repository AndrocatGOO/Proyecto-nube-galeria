const express = require("express");
const router = express.Router();
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');



console.log("pasando por rutas");

//ROUTES RUTAS html

router.get("/",(req, res)=>{                      //redirigir al inicio de la web
    res.render("index");                         //en ves de usar   res.sendFile(path.join(__dirname + "/views/index.html"));   se usa esto para archivos ejs
})

router.get("/index",(req, res)=>{                      //redirigir al inicio de la web
    res.render("index");                         //en ves de usar   res.sendFile(path.join(__dirname + "/views/index.html"));   se usa esto para archivos ejs
})

router.get("/home", isLoggedIn ,(req, res)=>{                      //redirigir al inicio de la galeria
    res.render("home");
})



router.get("/terms",(req, res)=>{                      //redirigir a los terminos y condiciones
    res.render("terms");
})

router.get("/about",(req, res)=>{                      //redirigir a about
    res.render("about");
})

router.get("/contact",(req, res)=>{                      //redirigir al formulariod de contact
})

router.get("/login",isNotLoggedIn,(req, res)=>{                      //redirigir al  signup
    res.render("signup");
})

/*router.get("/admin",(req, res)=>{                      //redirigir al panel del admin, soolo admins
    res.render("admin");
})
*/


module.exports = router;