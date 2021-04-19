const express = require("express");
const { query } = require("../database");
const router = express.Router();
const pool = require("../database");

const { format } = require("timeago.js");
const { Router } = require("express");


//obtener ruta y enviar a subir img
router.get("/add",(req, res)=>{
    res.render("postimg/add.ejs");
});


//subir imagenes a db
router.post("/add", async (req, res)=>{
    const {title, src, descripcion} =req.body;
    const newimg={
        title,
        src,
        descripcion
    };
    await pool.query(`INSERT INTO post (src, title, descripcion) values ('${src}','${title}','${descripcion}');`,(err,resultado,fields)=>{
        if(err)throw err;
        res.redirect("/postimg");
    })
});


//obtener y redirecionar ruta a galeria
router.get("/", async(req,res)=>{
    const imgs = await pool.query(`SELECT * FROM post;`);
    res.render("postimg",{imgs});
});

router.get("/delete/:id",async (req,res)=>{
    const {id} = req.params;
    await pool.query(`DELETE FROM post WHERE id ='${id}';`);
    res.redirect("/postimg");
});

router.get("/edit/:id",async (req,res)=>{
    const {id} = req.params;
    const aid = id;
    const imgs = await pool.query(`SELECT * FROM post WHERE id='${id}';`);
    res.render("postimg/editimg.ejs",{imgs:imgs[0],aid:aid});
});


router.post("/edit/:id", async(req,res)=>{
    const {id} = req.params;
    const { title, src, descripcion } = req.body;
    const newimg ={
        title,
        descripcion,
        src
    };
    await pool.query(` update post set title='${title}', src='${src}', descripcion='${descripcion}' where id= ${id} ; `);
    console.log(newimg);
    res.redirect("/postimg");
});

module.exports = router;