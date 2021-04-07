const express = require("express");
const morgan = require("morgan");


//iniciar

const app =express();

//settings

app.set("port",process.env.PORT || 4000);

//MIDDLEWARES PRETICIONES PUBLICAS

app.use(morgan("dev"));

//GLOBAL VARIABLES



//ROUTES RUTAS



//PUBLIC



//START SERVER

app.listen(app.get("port"),()=>{
    console.log("Server en puerto", app.get("port"));
});
