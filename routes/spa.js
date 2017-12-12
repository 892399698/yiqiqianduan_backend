var express = require('express');
var router = express.Router();
var session = require('express-session');
var conn = require('../libs/sql');
var common = require('../libs/common');
var filter = require('../libs/filter');
// console.log('filter',filter);
router.get('/:action', filter.authorize);
router.put('/:action', filter.authorize);
router.delete('/:action', filter.authorize);
/* GET spa page. */
router.get('/', function (req, res) {
    console.log('ceshiyixia');
    res.send({
        code: 200,
        config: {
            login: 1
        }
    })
});
router.get('/config', function (req, res) {
    res.send({
        code: 200,
        config: {
            login: 1
        }
    })
});
router.post('/login', (req, res) => {
    let querys = req.body || {},
        reg = /^[\da-zA-Z@_-]+$/;
    let name = querys.username,
        pwd = querys.password;

    try {
        if (req.session.user && req.session.user === 'admin') {
            res.send({
                code: 200,
                message: "已登录！"
            });
        } else if (reg.test(name) && reg.test(pwd)) {
            conn.query(`SELECT COUNT(1) as solution FROM admin where name="${name}" AND password="${common.md5(pwd)}"`, function (err, results, fields) {
                let result = results && results[0].solution;
                if (result && result === 1) {
                    req.session.user = 'admin';
                    // console.log('fields',fields);
                    res.send({
                        code: 200,
                        message: "登录成功！"
                    });
                } else {
                    console.log('error', err);
                    res.send({
                        code: 2002,
                        message: "用户名或密码错误！"
                    })
                }
            });


        } else {
            res.send({
                code: 2001,
                message: '登录失败，请重试！'
            })
        }
    } catch (e) {
        console.log('登录错误', e);
    }




})

router.post('/:action', filter.authorize);

module.exports = router;