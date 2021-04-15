const mysql = require("mysql");
const express =require('express');
const path = require("path");                        //evitar errores de rutas de directorios
const morgan = require("morgan");                     //muestra peticiones del servidor en consola

//iniciar

const app = express();                              //inicia servidor


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

app.use(morgan("dev"));      //se ejecute auto cada que hago cambios
app.use(express.urlencoded({extended: false}))   ;
app.use(express.json());

//routes

app.use(require('./routes/index'));              //ir al archivo de rutas
app.use(require('./routes/autentication'));
app.use("/postimg", require('./routes/postimg'));


//GLOBAL VARIABLES

app.use((req,res,next)=>{
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






