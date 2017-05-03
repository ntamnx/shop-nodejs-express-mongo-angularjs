/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 28, 2017, 11:14:53 AM
 Author     : nguyen.xuan.tam
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../../config/database');
var LoginHistory = require('../models/login_history');
var common = require('./common.js');
var error = require('mongoose-error-handler');
var message = require('./message');
router.get('/index', passport.authenticate('jwt', {session: false}), common.check_role, index);
/**
 * @date 28/4/2017
 * @function get all history login.
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function index(req, res) {
    LoginHistory.find({}, function (err, lgh) {
        res.status(200).send(lgh);
    });
}
/**
 * @date 28/4/2017
 * @function delete a recore by id;
 * @returns {undefined}
 */
function destroy(req, res) {
    LoginHistory.remove({
        '_id': req.params.id,
    }, function (err) {
        if (err) {
            return  res.status(400).send({
                msg: message.error,
            });
        }
        return res.status(200).send({
            msg: message.delete_success,
        })
    });
}
module.exports = router;


