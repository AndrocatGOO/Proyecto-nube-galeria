const mysql = require("mysql");                 //conectar mysql
const express =require('express');                  //express ._. para manejo de rutas
const path = require("path");                        //evitar errores de rutas de directorios
const morgan = require("morgan");                     //muestra peticiones del servidor en consola
const { connect } = require("./routes/index");              //manejo de rutas
const flash = require("connect-flash");                 //alertas/notificaciones
const session = require("express-session");                 //sesiones
const { Session } = require("inspector");                   //seguridad de session
const mysqlstore = require('express-mysql-session');                    //coneccion sql session
const { database } = require('./keys');                 //conecion sql
const passport = require('passport');                   //mantener session
const multer = require('multer');                   //ayuda para subir imagenes
const cloudinary = require('cloudinary');                   //servidor para guardar imagenes
const fs = require('fs-extra');                 //ayuda a eliminar archivos sin tanto codigo



//procesar .env
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}




//----------INICIAR SERVER-----------

const app = express();                              //inicia servidor

require("./lib/passport");                  //MANEJO DE SESIONES



//----------CONFIGURACIONES DEL SERVER-----------

app.set("views", path.join(__dirname + "/views"));                  //cambiar ruta views
app.set("port", process.env.PORT || 3003);                  //crear variable que se pueda cambiar para puerto
app.set("view engine", "ejs");                  //motor de plantilla que utilizo (ejs)
app.engine("html", require("ejs").renderFile);                  //usar html como ejs
app.use(express.urlencoded({extend:true}));                 //visualizar tipo de datos coon lenguaje latinoamericano

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});


//----------MIDLEWARE-----------

app.use(morgan("dev"));                 //se ejecute auto cada que hago cambios

//--MULTER--

//storeage del multer y configurar images
const storage = multer.diskStorage({
    destination:path.join(__dirname,"public/uploads"),
    filename:(req,file,cb)=>{
        cb(null, new Date().getTime() +file.originalname);
    }
});

app.use(multer({storage}).single("image"));                  //procesar imagenes para datos de servidor


//configura la sesion
app.use(session({
    secret: "asd",
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));


//MANEJO DE PETICIONES POST,PUT,req.body...
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(flash());                   //notificaciones/alertas

app.use(passport.initialize());                 //iniciar el modulo passport
app.use(passport.session());                    //guardar sesion




//----------RUTAS-----------

//archivos de rutas
app.use(require('./routes/index'));
app.use(require('./routes/autentication'));
app.use("/profile", require('./routes/profile'));



//----------VARIABLES GLOBALES-----------

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.send({err:err.message});
    app.locals.hecho = req.flash("hecho");
    app.locals.user= req.user;
    next();
});



//----------STATIC FILES PUBLIC-----------

app.use(express.static(path.join(__dirname, "public")));  //acceso a los archivos  publicos




//----------INICIO DE SERVIDOR -----------

app.listen(app.get("port"),() =>{                       //mensaje por consola en que puerto se ejecuta
    console.log("server en puerto ",app.get("port"));
    console.log("Environment: ", process.env.NODE_ENV);
});




//----------MOSTRAR MENSAJES GENERALES EN CONSOLA-----------

app.use((err,req,res,next)=>{
res.send({err:err.messamge});
});





module.exports=app;