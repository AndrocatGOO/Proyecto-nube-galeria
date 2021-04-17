const mysql = require("mysql");
const { promisify }=require ("util");
//const { database }=require ("./keys");
const pool = mysql.createPool({
    database:{
        host:"localhost",
        user:"root",
        password:"1417",
        database:"test"
    }
});

pool.getConnection=((err,connection) =>{
    if (err){
        if (err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("SE HA CERRADO LA CONEXION CON LA BASE DE DATOS");
        }
        if (err.code === "ER_CON_COUNT_ERROR"){
            console.error("DATABASE TIENE MAS CONEXIONES");
        }
        if (err.code === "ECONNREFUSED"){
            console.error("LA CONEXION SE PERDIO");
        }
        if(err){
            console.log(err);
        }
    }
    if (connection) connection.relase()
        console.log("DATABASE CONECTADA");
        return;
})

pool.query= promisify(pool.query);   //convirtiendo a promesas callbacks

module.exports= pool;


/*let con =mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"1417",
    database:"androgallery"
});
con.connect();
con.query("select * from user", (err, res, campos) =>{
    console.log(res);
});
con.end(); */