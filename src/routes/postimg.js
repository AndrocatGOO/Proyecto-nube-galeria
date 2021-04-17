const express = require("express");
const { query } = require("../database");
const router = express.Router();

const pool = require("../database");

router.get("/add",(req, res)=>{
    res.render("postimg/add.ejs");
});

router.post("/add", (req, res)=>{
    const {title, src, descripcion} =req.body;
    const newimg={
        title,
        src,
        descripcion
    };
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection
        connection.query(`INSERT INTO post (src, title, descripcion) values ('${src}','${title}','${descripcion}');`, function (error, results, fields) {
          // When done with the connection, release it.
        connection.release();
          // Handle error after the release.
        if (error) throw error;
          // Don't use the connection here, it has been returned to the pool.
        });
    res.send("recibido");
});
    }
);

pool.end(()=>{console.log("Closed")})








//const data = await pool.query("");
//console.log(data);


/*pool.query(`INSERT INTO post (src, title, descripcion) values ('${src}','${title}','${descripcion}');`,(err,resutlt)=>{
    console.log(result);
    });

router.post("/add", (req, res)=>{
    const {title, src, descripcion} =req.body;
    const newimg={
        title,
        src,
        descripcion
    };
    pool.query(`INSERT INTO post (src, title, descripcion) values ('${src}','${title}','${descripcion}');`,(err,resutlt)=>{
        if(err){
            console.log(err);
        }
    console.log(resutlt);
    }
)});*/


    /*await pool.query(`INSERT INTO post (src, title, descripcion) values ('${src}','${title}','${descripcion}');`);
    console.log(newimg);
    res.send("Recibido");
});*/
/*
    const data =pool.query("select * from user");
    console.log(data);
    pool.query("INSERT INTO asd set ?",[newimg]);
    console.log(newimg);
    res.send("recibido");

});*/




module.exports = router;