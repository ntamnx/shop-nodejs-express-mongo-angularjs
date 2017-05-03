/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 28, 2017, 3:10:44 PM
 Author     : nguyen.xuan.tam
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../../config/database');
var Category = require('../models/category');
var common = require('../helpers/common.js');
var error = require('mongoose-error-handler');
var message = require('../helpers/message');
var status = require('../helpers/status');
router.get('/index', passport.authenticate('jwt', {session: false}), common.check_role, index);
router.post('/add', passport.authenticate('jwt', {session: false}), common.check_role, add);
router.put('/update/:id', passport.authenticate('jwt', {session: false}), common.check_role, update);
router.get('/show/:id', passport.authenticate('jwt', {session: false}), common.check_role, show);
router.delete('/destroy/:id', passport.authenticate('jwt', {session: false}), common.check_role, destroy);
/**
 * @date 28/4/2014
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function index(req, res) {
    Category.find({}, function (err, categories) {
        if (err) {
            return res.status(status.BAD_REQUEST).send({
                msg: message.error,
            })
        }
        res.status(status.OK).send(categories);
    })
}
/**
 * @date 28/4/2017
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function add(req, res) {
    Category.create(req.body, function (err) {
        if (err) {
            return res.status(status.BAD_REQUEST).send(error.set(err));
        }
        res.status(status.OK).send({
            msg: message.add_success
        });
    });
}
/**
 * @date 3/5/3017
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function update(req, res) {
    delete req.body["_id"];
    Category.update({_id: req.params.id}, req.body, function (err) {
        if (err) {
            return res.status(status.BAD_REQUEST).send({
                msg: error.set(err),
            });
        }
        return res.status(status.OK).send({
            msg: message.update_success
        });
    });
}
/**
 * @date 28/4/2016
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function show(req, res) {
    Category.findOne({_id: req.params.id}, function (err, cate) {
        if (err)
            throw err;
        res.status(status.OK).send(cate);
    });
}
/**
 * @date 5/3/2017
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function destroy(req, res) {
    Category.remove({_id: req.params.id}, function (err) {
        if (err) {
            throw err;
        } else {
            res.status(status.OK).send({
                msg: message.delete_success
            });
        }
    });
}
module.exports = router;
