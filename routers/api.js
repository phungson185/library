const express = require('express');

// var pool = new pg.Pool(config);
require('dotenv/config');
var pg = require('pg');

const client = new pg.Client(process.env.db_connect);
client.connect(err => {
    console.log(client.connection.stream._host + 'connected');
})

var tk = '';
var mk = '';
const api = express.Router();
const parseCookie = str =>
    str
        .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
    }, {});
// var id = parseCookie(document.cookie).matkhau;
// document.getElementById("id").innerText = id;
// 			console.log(document.cookie);
api.get('',(req,res) => {
    res.json(req.query);
});



api.get('/dang-nhap', (req,res) => {
    client.query('SELECT dang_nhap($1,$2)',[req.query.tk,req.query.mk])
    .then(result => {
        // console.log(result.rows[0].dang_nhap);
            tk = req.query.tk;
            mk = req.query.mk;
            res.json({dn : result.rows[0].dang_nhap});
    })
});

api.get('/get-sv',(req,res)=>{
    client.query('SELECT * FROM get_sv($1)',[tk])
    .then(result =>{
        // console.log(result);
        res.json({kq : result});
    })
})

api.get('/lay-tt',(req,res)=>{
    client.query('SELECT * FROM lay_tt($1)',[tk])
    .then(result =>{
        res.json({kq : result});
    })
})



api.get('/doi-mat-khau', (req,res) => {
    client.query('SELECT doi_mat_khau($1,$2,$3)',[req.query.tk,req.query.mkc,req.query.mkm])
    .then(result => {
        console.log(result.rows[0].doi_mat_khau);
        res.json({rs : result.rows[0].doi_mat_khau})
    })
});

api.get('/tim-sach', (req,res) => {
    client.query(req.query.query)
    .then(result => {
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows,
            rs:true,
            rowCount : result.rowCount
        })
    }
    })
})

api.get('/tim-sach-tt', (req,res) => {
    client.query(req.query.query)
    .then(result => {
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows,
            rs:true,
            rowCount : result.rowCount
        })
    }
    })
})


api.get('/sach-dang-muon', (req,res) => {
    client.query('SELECT * FROM sach_dang_muon($1)',[req.query.mssv])
    .then(result => {
        console.log(result);
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows,
            rs:true,
        })
    }
    })
})

api.get('/sach-da-muon', (req,res) => {
    client.query('SELECT * FROM sach_da_muon($1)',[req.query.mssv])
    .then(result => {
        console.log(result);
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows,
            rs:true,
        })
    }
    })
})



api.get('/sach-dang-muon-tt', (req,res) => {
    client.query('SELECT * FROM sach_dang_muon($1)',[req.query.mssv])
    .then(result => {
        console.log(result);
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows,
            rs:true,
        })
    }
    })
})

api.get('/tim-theo-mssv', (req,res) => {
    client.query('SELECT * FROM tim_theo_mssv($1)',[req.query.mssv])
    .then(result => {
        console.log(result);
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows,
            rs:true
        })
    }
    })
})

api.get('/tim-theo-ma-sach', (req,res) => {
    client.query('SELECT * FROM tim_theo_ma_sach($1)',[req.query.ms])
    .then(result => {
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows[0],
            rs:true
        })
    }
    })
})

api.get('/muon-sach', (req,res) => {
    client.query('SELECT muon_sach($1,$2,$3,$4)',[req.query.mpl,req.query.mss,req.query.mssv,req.query.ts])
    .then(result => {
    // console.log(result);
    res.json({
        rs:true
      })
    })
    .catch(err => {
        re:false
    })
})


api.get('/tra-sach', (req,res) => {
    client.query('SELECT tra_sach($1)',[req.query.ms])
    .then(result => {
    console.log(result);
    res.json({
        rs:true
      })
    })
    .catch(err => {
      rs:false
    })
})


api.get('/gia-han-sach', (req,res) => {
    client.query('SELECT gia_han_sach($1)',[req.query.ms])
    .then(result => {
    // console.log(result);
    res.json({
        rs:true
      })
    })
    .catch(err => {
      rs:false
    })
})


api.get('/trung-binh', (req,res) => {
    client.query('SELECT tinh_tb()')
    .then(result => {
    res.json({
        rs:true,
        tb:result.rows[0].tinh_tb
      })
    })
    .catch(err => {
      rs:false
    })
})

api.get('/ds-dang-muon', (req,res) => {
    client.query(req.query.query)
    .then(result => {
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows,
            rs:true,
            rowCount : result.rowCount
        })
    }
    })
})


api.get('/thong-tin-sinh-vien', (req,res) => {
    client.query(req.query.query)
    .then(result => {
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows,
            rs:true,
            rowCount : result.rowCount
        })
    }
    })
})

api.get('/them-sach', (req,res) => {
    client.query('SELECT them_sach($1,$2,$3,$4,$5,$6,$7,$8,$9)',[req.query.mpl,req.query.mss,req.query.ts,req.query.tg,req.query.nha_xb,req.query.nam_xb,req.query.st,req.query.gt,req.query.mt])
    .then(result => {
        console.log(result);
    res.json({
        rs:true
    })
    .catch(err => {
        rs:false
    })
    })
});

api.get('/tim-sach-de-xoa', (req,res) => {
    client.query(`SELECT * FROM tim_sach('%',$1,'%','%','%','%','%','%','%')`,[req.query.ms])
    .then(result => {
        if(result.rows.length == 0)
            res.json({rs:false})
        else{
        res.json({
            table: result.rows[0],
            rs:true,
            rowCount : result.rowCount
        })
    }
    })
})
api.get('/xoa-sach', (req,res) => {
    client.query(`SELECT xoa_sach($1,$2)`,[req.query.mpl,req.query.mss])
    .then(result => {
    res.json({rs:true})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/cu', (req,res) => {
    client.query(`SELECT so_sach_cu()`)
    .then(result => {
    res.json({rs:true, ssc : result.rows[0].so_sach_cu})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/tong', (req,res) => {
    client.query(`SELECT COUNT(*) FROM sach`)
    .then(result => {
    res.json({rs:true, tong : result.rows[0].count})
    .catch(err =>{
        rs:false
    })
    })
})
api.get('/so-qua-han', (req,res) => {
    client.query(`SELECT so_qua_han()`)
    .then(result => {
    res.json({rs:true, sqh : result.rows[0].so_qua_han})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/so-con-han', (req,res) => {
    client.query(`SELECT (SELECT COUNT(*) FROM danh_sach_muon) -so_qua_han() as so_con_han`)
    .then(result => {
    res.json({rs:true, sch : result.rows[0].so_con_han})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/tt-nha-xb', (req,res) => {
    client.query(`SELECT * FROM tt_nha_xb()`)
    .then(result => {
        console.log(result);
    res.json({rs:true, table : result.rows})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/muon-theo-vien', (req,res) => {
    client.query(`select * from muon_theo_vien()`)
    .then(result => {
    res.json({rs:true, tkvien : result.rows})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/muon-theo-gt', (req,res) => {
    client.query(`select * from muon_theo_gioi()`)
    .then(result => {
    res.json({rs:true, tkgioi : result.rows})
    .catch(err =>{
        rs:false
    })
    })
})
api.get('/muon-theo-khoa', (req,res) => {
    client.query(`select * from muon_theo_khoa()`)
    .then(result => {
    res.json({rs:true, tkkhoa : result.rows})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/luot-muon-theo-tac-gia', (req,res) => {
    client.query(`select * from muon_theo_tg()`)
    .then(result => {
    res.json({rs:true, lmttg : result.rows})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/linh-vuc-yeu-thich', (req,res) => {
    client.query(`SELECT ma_yeu_thich()`)
    .then(result => {
    res.json({rs:true, lvyt : result.rows[0]})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/muon-theo-thoi-diem', (req,res) => {
    client.query(`select * from muon_theo_thoi_diem()`)
    .then(result => {
    res.json({rs:true, mttd : result.rows})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/tim-theo-thoi-gian', (req,res) => {
    client.query(req.query.query)
    .then(result => {
    res.json({rs:true, tttg : result.rows[0]})
    .catch(err =>{
        rs:false
    })
    })
})

api.get('/luot-muon-theo-ten', (req,res) => {
    client.query(`SELECT * FROM luot_muon_theo_ten()`)
    .then(result => {
    res.json({rs:true, lmtt : result.rows})
    .catch(err =>{
        rs:false
    })
    })
})
module.exports = api;