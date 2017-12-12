module.exports.authorize = function (req, res, next) {
    console.log('authorize');
    if (!req.session.user || req.session.user !== 'admin') {
        res.send({
            code: 1001,
            message: '没有权限'
        })
        //   res.redirect('/admin/login');
    } else {
        next();
    }
}