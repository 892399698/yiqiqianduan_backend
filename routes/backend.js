var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var config = require('../config/database');
// var client = new mysql();
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7910146'
});

// client.user = config.database_name;
// client.password = config.database_password;
conn.connect();

const DATABASE_NAME = 'yiqiqianduan';
const DATABASE_TABLE = 'admin';
const INSTALL_LOG_PATH = './config/install.log';

function createDatabase(name) {
    conn.query(`CREATE DATABASE ${name} if not exists ${name}`, function (err) {
        console.log('do');
        if (err && err.number != conn.ERROR_DB_CREATE_EXISTS) {
            throw err;
        }
    })
}

function createTable(name, columns) {
    conn.query(`CREATE TABLE IF NOT EXISTS ${name} ${columns}`)
}
/* GET spa page. */
router.get('/', function (req, res) {
    res.send({
        code: 1000
    })
})


router.get('/install', function (req, res) {
    try {
        if (!fs.exists(INSTALL_LOG_PATH)) {
            createDatabase(DATABASE_NAME);
            conn.query(`use ${DATABASE_NAME}`);
            createTable('admin', '(name VARCHAR(20),password VARCHAR(60),create_time DATE)');
            conn.query('INSERT INTO admin (name,password,create_time) values ("admin",MD5("pwd152127"),now())');
            fs.writeFileSync('./config/install.log', '1', 'utf-8');
            res.send('安装成功！');
        }else{
            res.send('已安装，请勿重复安装！');
        }
        // var data = fs.readFileSync('./config/install.log', 'utf-8');
        // console.log('data', data);
        // if (!data) {
        // createDatabase(DATABASE_NAME);
        // createTabel('admin','(name VARCHAR(20),password VARCHAR(60),create_time DATE)');
        // conn.query('INSERT INTO admin (name,password,create_time) values ("admin",MD5("pwd152127"),now())');
        // fs.writeFileSync('./config/install.log', '1', 'utf-8');
        // }
        // res.send('安装成功！');

    } catch (e) {
        res.send('安装失败，请重试！');
        console.log('获取安装文件失败：', e);
    }




});

module.exports = router;