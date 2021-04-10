const express =require('express');
const app = express();                              //inicia servidor
const path = require("path");                        //evitar errores de rutas de directorios
//iniciar



//settings

app.set("views", path.join(__dirname + "/views"));
app.set("port",3000);                           //crear variable que se pueda cambiar para puerto
app.engine("html", require("ejs").renderFile);  //usar html
app.set("view engine", "ejs");                  //motor de plantilla que utilizo

//MIDDLEWARES PRETICIONES PUBLICAS

//routes

app.use(require('./routes/index'));

//GLOBAL VARIABLES

//PUBLIC  static files

app.use(express.static(path.join(__dirname, "public")));  //acceso a los estilos y scripts de htmls

//cuando inicia SERVER

app.listen(app.get("port"),() =>{                       //mensaje por consola en que puerto se ejecuta
    console.log("server en puerto ",app.get("port"))
});

//server


