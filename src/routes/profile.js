const express = require("express");
const { query } = require("../database");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');
const cloudinary = require('cloudinary');
const { Router } = require("express");
const fs = require('fs-extra');
const  dateformat  = require('dateformat');

//SCRIP DE HACE CUANTO SE SUBIO LA IMAGEN
const { format, register } = require('timeago.js');
register('es_ES', (number, index, total_sec) => [
    ['justo ahora', 'ahora mismo'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'in %s horas'],
    ['hace 1 dia', 'en 1 dia'],
    ['hace %s dias', 'en %s dias'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años']
][index]);
const timeago = timestamp => format(timestamp, 'es_ES');




//----------MANEJO DE IMGS----------

//obtener ruta add y renderizar
router.get("/add",isLoggedIn ,(req, res)=>{
    res.render("profile/add.ejs");
});

//obtener y renderizar perfil
router.get("/",isLoggedIn , async (req,res)=>{
    const user_id = req.user.id;
    const profile = await pool.query(`SELECT * FROM profile WHERE user_id='${user_id}';`);
    const perfil = profile[0];
    const img = await pool.query(`SELECT * FROM post WHERE user_id='${user_id}';`);
    res.render("profile",{ imgs:img ,timeago,perfil,dateformat});
});

//obtener ruta para editar imgs
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
    await fs.unlink(ruta);
    res.redirect("/profile");
});

//eliminar fotos de bd
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

//editar img bd
router.post("/edit/:id",isLoggedIn , async(req,res)=>{
    console.log(req.user.id);
    const {id} = req.params;
    const { title, descripcion } = req.body;
    const user_id = req.user.id;
    console.log(req.user.id);
    const idConfirm = await pool.query(`SELECT * FROM post WHERE id='${id}';`);
    const infoimg = idConfirm[0];
    const user_img = infoimg.user_id;
    if (user_id==user_img){
        await pool.query(` update post set title='${title}', descripcion='${descripcion}' where id= ${id} ; `);
    res.redirect("/profile");
    }else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }
    res.redirect("/profile");
});

//editar perfil
router.get("/editprofile/:id",isLoggedIn ,async (req,res)=>{
    const {id} = req.params;
    const user_id = req.user.id;
    const datos = await pool.query(`SELECT * FROM profile WHERE user_id='${id}';`);
    const datos_profile =datos[0];;
    if(user_id===datos_profile.user_id){
        res.render("profile/editprofile",{datos:datos[0]});
    }else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }
});

router.post("/editprofile/edit/:id",isLoggedIn , async(req,res)=>{
    const {id} = req.params;
    const{age_of_birth,gender,biografia,public_web}=req.body;
    console.log("aaaaaaaaaaaaaaaaaaa                             ",age_of_birth);
    const user_id = req.user.id;
    const idConfirm = await pool.query(`SELECT * FROM profile WHERE user_id='${id}';`);
    const infousr = idConfirm[0];
    const user_profile = infousr.user_id;
    if(user_profile==user_id){
        if(biografia==""){
            await pool.query(` update profile set gender='${gender}', age_of_birth='${age_of_birth}', public_web='${public_web}' where user_id= ${id} ; `);
            res.redirect("/profile");
        }
        await pool.query(` update profile set age_of_birth='${age_of_birth}', gender='${gender}', biografia='${biografia}', public_web='${public_web}' where user_id= ${id} ; `);
        res.redirect("/profile");
    }else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }

    res.redirect("/");
});

router.get("/editheader/:id",isLoggedIn ,async (req,res)=>{
    const {id} = req.params;
    const user_id = req.user.id;
    const datos = await pool.query(`SELECT image_header FROM profile WHERE user_id='${id}';`);
    const header =datos[0];;
    if(user_id==id){
        res.render("profile/editheader",{header,user_id});
    }else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }
});

router.post("/editheader/:id",isLoggedIn , async(req,res)=>{
    console.log(req.file);
    const {id} = req.params;
    const header = req.file;
    const user_id = req.user.id;
    const idConfirm = await pool.query(`SELECT * FROM profile WHERE user_id='${id}';`);
    const profile_inf= idConfirm[0];
    const profile_id=profile_inf.user_id;
    console.log(req.file);
    if(profile_id==user_id){
        const imgcloud = await cloudinary.v2.uploader.upload(header.path);
        console.log("aaaaaa ",imgcloud);
        const imageURL=imgcloud.url;
        await pool.query(`update profile set image_header='${imageURL}'where user_id= ${id} ; `);
        ruta = req.file.path;
        await fs.unlink(ruta);
        res.redirect("/profile");
    }
    else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }
});

router.get("/edit_img_perfil/:id",isLoggedIn ,async (req,res)=>{
    const {id} = req.params;
    const user_id = req.user.id;
    const datos = await pool.query(`SELECT image FROM profile WHERE user_id='${id}';`);
    const header =datos[0];;
    if(user_id==id){
        res.render("profile/edit_img_perfil",{header,user_id});
    }else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }
});

router.post("/edit_img_perfil/:id",isLoggedIn , async(req,res)=>{
    console.log(req.file);
    const {id} = req.params;
    const img = req.file;
    const user_id = req.user.id;
    const idConfirm = await pool.query(`SELECT * FROM profile WHERE user_id='${id}';`);
    const profile_inf= idConfirm[0];
    const profile_id=profile_inf.user_id;
    console.log(req.file);
    if(profile_id==user_id){
        const imgcloud = await cloudinary.v2.uploader.upload(img.path);
        console.log("aaaaaa ",imgcloud);
        const imageURL=imgcloud.url;
        await pool.query(`update profile set image='${imageURL}'where user_id= ${id} ; `);
        ruta = req.file.path;
        await fs.unlink(ruta);
        res.redirect("/profile");
    }
    else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }
});

//perfil publico

router.get("/profile/:username",isLoggedIn ,async (req,res)=>{
    const {username} = req.params;
    console.log(username);
    const perfil = await pool.query(`SELECT * FROM profile WHERE username='${username}';`);
    console.log(perfil);
    /*const user_id = req.user.id;
    const datos = await pool.query(`SELECT * FROM profile WHERE user_id='${id}';`);
    const datos_profile =datos[0];;
    if(user_id===datos_profile.user_id){
        res.render("profile/editprofile",{datos:datos[0]});
    }else{
        console.log("hacker!xd");
        res.redirect("/terms");
    }*/
    res.redirect("/terms");
});




module.exports = router;