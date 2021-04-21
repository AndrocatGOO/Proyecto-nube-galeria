const express = require("express");
const { query } = require("../database");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');

const cloudinary = require('cloudinary');

const { format } = require("timeago.js");
const { Router } = require("express");

const fs = require("fs");



//obtener ruta y enviar a subir img
router.get("/add",isLoggedIn ,(req, res)=>{
    res.render("profile/add.ejs");
});


//subir imagenes a db



router.post("/add",isLoggedIn , async (req, res)=>{

    console.log(req.body);
    console.log(req.file);
    const user_id = req.user.id;
    const{title,descripcion}=req.body;
    const imgcloud = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(imgcloud);
    const imageURL=imgcloud.url;
    await pool.query(`INSERT INTO post (imageURL, title, descripcion,user_id) values ('${imageURL}','${title}','${descripcion}','${user_id}');`);
    ruta = req.file.path;
    console.log("esta es la ruta: "+ruta);
    await fs.unlink(ruta)
    res.redirect("/profile");
});


//obtener y redirecionar ruta a galeria
router.get("/",isLoggedIn , async (req,res)=>{
    const user_id = req.user.id;
    const img = await pool.query(`SELECT * FROM post WHERE user_id='${user_id}';`);
    res.render("profile",{ imgs:img });
});

router.get("/delete/:id",isLoggedIn ,async (req,res)=>{
    const {id} = req.params;
    const user_id = req.user.id;
    const idConfirm = await pool.query(`SELECT * FROM post WHERE id='${id}';`);
    const infoimg = idConfirm[0];
    const user_img = infoimg.user_id;
    if(user_id==user_img){
        await pool.query(`DELETE FROM post WHERE id ='${id}';`);
        res.redirect("/profile");
    }else{
        //hackers xd
        res.redirect("/Terms");
    }
});

router.get("/edit/:id",isLoggedIn ,async (req,res)=>{
    const {id} = req.params;
    const aid = id;

    const user_id = req.user.id;
    const idConfirm = await pool.query(`SELECT * FROM post WHERE id='${id}';`);
    const infoimg = idConfirm[0];
    const user_img = infoimg.user_id;
    if (user_id==user_img){
        const imgs = await pool.query(`SELECT * FROM post WHERE id='${id}';`);
    res.render("profile/editimg.ejs",{imgs:imgs[0],aid:aid});
    }else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }
});


router.post("/edit/:id",isLoggedIn , async(req,res)=>{
    const {id} = req.params;
    const { title, imageURL, descripcion } = req.body;
    const user_id = req.user.id;
    const idConfirm = await pool.query(`SELECT * FROM post WHERE id='${id}';`);
    const infoimg = idConfirm[0];
    const user_img = infoimg.user_id;
    if (user_id==user_img){
        await pool.query(` update post set title='${title}', imageURL='${imageURL}', descripcion='${descripcion}' where id= ${id} ; `);
    res.redirect("/profile");
    }else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }
});

module.exports = router;