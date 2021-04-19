const express = require("express");
const router = express.Router();



console.log("pasando por rutas");

//ROUTES RUTAS html

router.get("/",(req, res)=>{                      //redirigir al inicio de la web
    res.render("index");                         //en ves de usar   res.sendFile(path.join(__dirname + "/views/index.html"));   se usa esto para archivos ejs
})
/*
router.get("/index",(req, res)=>{                      //redirigir al inicio de la web
    res.render("index");                         //en ves de usar   res.sendFile(path.join(__dirname + "/views/index.html"));   se usa esto para archivos ejs
})

router.get("/home",(req, res)=>{                      //redirigir al inicio de la galeria
    res.render("home");
})


router.get("/gallery",(req, res)=>{                      //redirigir al galery
    res.render("gallery");
})

router.get("/profile",(req, res)=>{                      //redirigir al profile
    res.render("profile");
})

router.get("/terms",(req, res)=>{                      //redirigir a los terminos y condiciones
    res.render("terms");
})


router.get("/admin",(req, res)=>{                      //redirigir al panel del admin, soolo admins
    res.render("admin");
})
*/


module.exports = router;