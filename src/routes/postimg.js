const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/add",(req, res)=>{
    res.render("postimg/add.ejs");
});





module.exports = router;