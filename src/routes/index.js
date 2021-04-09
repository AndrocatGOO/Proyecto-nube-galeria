const express = require("express");
const router = express.Router();

//ROUTES RUTAS

router.get("/home",(req, res)=>{                      //redirigir al inicio de la web
    res.render("index");                         //en ves de usar   res.sendFile(path.join(__dirname + "/views/index.html"));   se usa esto para archivos ejs
})

router.get("/login",(req, res)=>{                      //redirigir al logeo
    res.render("login");
})

router.get("/galery",(req, res)=>{                      //redirigir al galery
    res.render("galery");
})

router.get("/profile",(req, res)=>{                      //redirigir al profile
    res.render("profile");
})



module.exports = router;