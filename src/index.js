const mysql = require("mysql");
const express =require('express');
const path = require("path");                        //evitar errores de rutas de directorios
const morgan = require("morgan");                     //muestra peticiones del servidor en consola
const { connect } = require("./routes/index");
const flash = require("connect-flash");
const session = require("express-session");
const { Session } = require("inspector");
const mysqlstore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');



//iniciar

const app = express();                              //inicia servidor

require("./lib/passport");

//settings

app.set("views", path.join(__dirname + "/views"));//cambiar ruta views
app.set("port", process.env.PORT || 3000);                           //crear variable que se pueda cambiar para puerto
app.set("view engine", "ejs");                  //motor de plantilla que utilizo (ejs)
app.engine("html", require("ejs").renderFile);  //usar html como ejs
app.use(express.urlencoded({extend:true}));             //visualizar tipo de datos coon lenguaje latinoamericano
                /*app.engine(".hbs",exphbs({
                    defaultlayout:"main",
                    layoutsDir: path.join(app.get("views"),"layouts"),
                    partialDir: path.join(app.get("views"),"partials")
                    extname:".hbs",
                    helpers: require("./lib/handlebars")
                }));

                app.set("view engine". ".hbs");*/

//MIDDLEWARES PRETICIONES PUBLICAS
app.use(session({
    secret: "asd",
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));

app.use(morgan("dev"));      //se ejecute auto cada que hago cambios
app.use(express.urlencoded({extended: false}))   ;
app.use(express.json());

app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

//routes

app.use(require('./routes/index'));              //ir al archivo de rutas
app.use(require('./routes/autentication'));
app.use("/postimg", require('./routes/postimg'));



//GLOBAL VARIABLES

app.use((err,req,res,next)=>{
    res.send({err:err.message});
    app.locals.hecho = req.flash("hecho");
    app.locals.user= req.user;
    next();
});



//PUBLIC  static files

app.use(express.static(path.join(__dirname, "public")));  //acceso a los estilos y scripts de htmls

//cuando inicia SERVER

app.listen(app.get("port"),() =>{                       //mensaje por consola en que puerto se ejecuta
    console.log("server en puerto ",app.get("port"))
});

//server

app.use((err,req,res,next)=>{           //mostrar mensajes error
res.send({err:err.messamge});
});








