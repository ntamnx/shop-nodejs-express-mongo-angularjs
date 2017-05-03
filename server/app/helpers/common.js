/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 28, 2017, 8:12:19 AM
 Author     : nguyen.xuan.tam
 */

module.exports = {
    getToken: function (headers) {
        if (headers && headers.authorization) {
            var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    check_role: function (req, res, next) {
        if (1 == 1) {
            next();
        } else {
            res.send('co lỗi rồi.');
        }
    }
};