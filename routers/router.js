const express = require("express");

const router = express.Router();;


router.get('/', (req,res) => {
    res.render('../views/csdl/127.0.0.1/wordpress/index.html');
})

router.get('/dang-nhap',(req,res) => {
    res.render('csdl/127.0.0.1/wordpress/dang-nhap/index.html')
})

module.exports = router;