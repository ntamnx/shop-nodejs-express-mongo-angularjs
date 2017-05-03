/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 27, 2017, 9:55:11 AM
 Author     : nguyen.xuan.tam
 */
var express = require('express');
var apiRoutes = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../../config/database');
var message = require('../helpers/message');
var status = require('../helpers/status');
var common = require('../helpers/common.js');
var User = require('../models/user');
var error = require('mongoose-error-handler');
var bcrypt = require('bcrypt');
// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/index', passport.authenticate('jwt', {session: false}), common.check_role, index);
apiRoutes.post('/add', common.check_role, add);
apiRoutes.put('/update/:id', passport.authenticate('jwt', {session: false}), common.check_role, update);
apiRoutes.get('/show/:id', passport.authenticate('jwt', {session: false}), common.check_role, show);
apiRoutes.delete('/destroy/:id', passport.authenticate('jwt', {session: false}), common.check_role, destroy);

/**
 * @date 28/4/2017
 * @function get list admin.
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function index(req, res) {
    User.find({}, function (err, users) {
        res.send(users);
    });
}
/**
 * 
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function add(req, res) {
    var newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
        if (err) {
            return res.status(status.BAD_REQUEST).send(error.set(err));
        }
        res.status(status.OK).send({msg: message.add_success});
    });
}
/**
 * 
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function show(req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
        if (err) {
            throw err;
        }
        return res.status(status.OK).send(user);
    });
}
/**
 * @date 28/4/2017
 * @function update password for admin
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function update(req, res) {
    var salt = bcrypt.genSaltSync(10);
    User.update({_id: req.params.id}, {
        password: bcrypt.hashSync(req.body.new_password, salt)
    }, function (err) {
        if (err) {
            throw err;
        }
        return res.status(status.OK).send({
            msg: message.update_success
        });
    });

}
/**
 * @date 28/4/2014
 * @fuction delete user admin by id
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function destroy(req, res) {
    User.remove({_id: req.params.id}, function (err) {
        if (err) {
            throw err;
        } else {
            res.status(status.OK).send({
                msg: message.delete_success
            });
        }
    });
}
module.exports = apiRoutes;
