const express = require("express");

const router = express.Router();;


router.get('/', (req,res) => {
    res.render('../views/csdl/127.0.0.1/wordpress/index.html');
})

router.get('/dang-nhap',(req,res) => {
    res.render('csdl/127.0.0.1/wordpress/dang-nhap/index.html')
})

// router.get('/dang-nhap-thu-thu',(req,res) => {
//     res.render('csdl/127.0.0.1/wordpress/dang-nhap-thu-thu/index.html')
// })

// router.get('/doimatkhau',(req,res) => {
//     res.render('csdl/127.0.0.1/wordpress/doi-mat-khau/index.html')
// })

module.exports = router;