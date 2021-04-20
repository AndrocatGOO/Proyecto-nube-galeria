const express = require("express");
const { query } = require("../database");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');

const { format } = require("timeago.js");
const { Router } = require("express");


//obtener ruta y enviar a subir img
router.get("/add",isLoggedIn ,(req, res)=>{
    res.render("profile/add.ejs");
});


//subir imagenes a db
router.post("/add",isLoggedIn , async (req, res)=>{
    const {title, src, descripcion} =req.body;
    const user_id = req.user.id;
    const newimg={
        title,
        src,
        descripcion
    };
    await pool.query(`INSERT INTO post (src, title, descripcion,user_id) values ('${src}','${title}','${descripcion}','${user_id}');`,(err,resultado,fields)=>{
        if(err)throw err;
        res.redirect("/profile");
    })
});


//obtener y redirecionar ruta a galeria
router.get("/",isLoggedIn , async (req,res)=>{
    const user_id = req.user.id;
    const img = await pool.query(`SELECT * FROM post WHERE user_id='${user_id}';`);
    console.log("consulta    "+img);
    res.render("profile",{ imgs:img });
});

router.get("/delete/:id",isLoggedIn ,async (req,res)=>{
    const {id} = req.params;
    await pool.query(`DELETE FROM post WHERE id ='${id}';`);
    res.redirect("/profile");
});

router.get("/edit/:id",isLoggedIn ,async (req,res)=>{
    const {id} = req.params;
    const aid = id;
    const imgs = await pool.query(`SELECT * FROM post WHERE id='${id}';`);
    res.render("profile/editimg.ejs",{imgs:imgs[0],aid:aid});
});


router.post("/edit/:id",isLoggedIn , async(req,res)=>{
    const {id} = req.params;
    const { title, src, descripcion } = req.body;
    const newimg ={
        title,
        descripcion,
        src
    };
    await pool.query(` update post set title='${title}', src='${src}', descripcion='${descripcion}' where id= ${id} ; `);
    console.log(newimg);
    res.redirect("/profile");
});

module.exports = router;