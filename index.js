const express = require("express");
const cors = require('cors');

const router = require('./routers/router');
const api = require('./routers/api');

// const bodyParser = require('body-parser')
const app = express();

// app.use(bodyParser);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static('views/csdl/127.0.0.1/wordpress'));

app.use(cors());

app.use('/',router);
app.use('/api',api);

// app.listen(2326); 
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// var pg = require('pg');
// var config = {
//     user: 'postgres',
//     database: 'projectDB',
//     password: 'sd29090411',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000,
// };

let server = app.listen(3000,() => {
    console.log(server.address());
})

// app.get("/", (req, res) => {
//     res.render('csdl/127.0.0.1/wordpress/index.html');        
// })
// app.get("/dangnhapsinhvien",(req,res)=>{
//     res.render('csdl/127.0.0.1/wordpress/dang-nhap-sinh-vien/index.html');        
// })
// app.post("/dangnhapsinhvien",urlencodedParser, function(req,res){
//     // res.render('csdl/127.0.0.1/wordpress/thong-tin-sinh-vien/index.html');

//     pool.connect(function(err,client,done){ //get database
//         if(err){
//             return console.log('error fetching client from pool',err);
//         }
//         var tk = req.body.tk
//         var mk = req.body.mk;

//         client.query("SELECT * FROM  ttdn_sinh_vien WHERE tai_khoan = '"+tk+"' AND mat_khau ='"+mk+"'",function(err,result){
//             //call done to release the client back to the pool
//             done();

//             if(err){
//                 res.end(); //stop connect   
//                 return console.error('error running query',err);
                
//             }
//             if(result.rowCount == 0)
//                 {
//                     // res.cookie('login',0);
//                     res.render('csdl/127.0.0.1/wordpress/dang-nhap-sinh-vien/index.html',{'<p>hi</p>' : '<p style="color: red;">Thông tin tài khoản hoặc mật khẩu không chính xác</p>'});
//                 }        
//             else{
//             console.log(result); 

//             // res.cookie('taikhoan1', tk1).cookie('matkhau',mk1);
//             // res.redirect('../');
//             res.render('csdl/127.0.0.1/wordpress/thong-tin-sinh-vien/index.html');
//             }
//         // res.render("",{id : tk1}) ;
//     // res.render(__dirname + 'views/csdl/127.0.0.1/wordpress/index.html')  
//     // res.sendFile('views/index.html',{id : result.rows[0].tk})
//         });
//     });
// });