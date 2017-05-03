/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 27, 2017, 9:49:17 AM
 Author     : nguyen.xuan.tam
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var LoginHistory = require('../models/login_history');
var jwt = require('jwt-simple');
var config = require('../../config/database');
var message = require('../helpers/message');
var staus = require('../helpers/status');
var error = require('mongoose-error-handler');
// create a new user account (POST http://localhost:8080/api/signup)
/**
 * 
 */
router.post('/login', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err)
            throw err;
        if (!user) {
            res.status(404).send({
                message_ui: message.login_not_corect
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    LoginHistory.create({user_id: user._id});
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    res.status(200).send({
                        token: 'JWT ' + token,
                        user: user,
                    });
                } else {
                    res.status(403).send({
                        message_ui: message.login_not_corect
                    });
                }
            });
        }
    });
});
module.exports = router;