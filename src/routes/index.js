const express = require("express");
const { query } = require("../database");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');

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




//ROUTES 

router.get("/",isNotLoggedIn,(req, res)=>{                      //redirigir al inicio de la web
    res.render("index");                         //en ves de usar   res.sendFile(path.join(__dirname + "/views/index.html"));   se usa esto para archivos ejs
})

router.get("/index",isNotLoggedIn,(req, res)=>{                      //redirigir al inicio de la web
    res.render("index");                         //en ves de usar   res.sendFile(path.join(__dirname + "/views/index.html"));   se usa esto para archivos ejs
})

router.get("/home",isLoggedIn , async (req,res)=>{
    const img = await pool.query(`select imageURL,title,image,username from post inner join profile on post.user_id = profile.user_id`);
    console.log(img);

    res.render("home",{ imgs:img ,timeago});
});


router.get("/terms",(req, res)=>{                      //redirigir a los terminos y condiciones
    res.render("terms");
})

router.get("/about",(req, res)=>{                      //redirigir a about
    res.render("about");
})

router.get("/contact",(req, res)=>{                      //redirigir al formulariod de contact
})

router.get("/login",isNotLoggedIn,(req, res)=>{                      //redirigir al  signup
    res.render("signup");
})

/*router.get("/admin",(req, res)=>{                      //redirigir al panel del admin, soolo admins
    res.render("admin");
})
*/


module.exports = router;