/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : May 3, 2017, 11:38:52 AM
 Author     : nguyen.xuan.tam
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../../config/database');
var message = require('../helpers/message');
var status = require('../helpers/status');
var common = require('../helpers/common.js');
var Superlier = require('../models/superlier');
var error = require('mongoose-error-handler');
router.get('/index', passport.authenticate('jwt', {session: false}), common.check_role, index);
router.post('/store', passport.authenticate('jwt', {session: false}), common.check_role, store);
router.put('/update/:id', passport.authenticate('jwt', {session: false}), common.check_role, update);
router.get('/show/:id', passport.authenticate('jwt', {session: false}), common.check_role, show);
router.delete('/destroy/:id', passport.authenticate('jwt', {session: false}), common.check_role, destroy);
/**
 * #@date 5/3/2017
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function index(req, res) {
    Superlier.find({}, function (err, superliers) {
        res.send(superliers);
    });
}
/**
 * @date 5/3/2017
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function store(req, res) {
    Superlier.create(req.body, function (err) {
        if (err)
            return res.status(status.BAD_REQUEST).send({
                msg: error.set(err),
            });
        res.send({
            msg: message.add_success,
        });
    });
}
/**
 * @date 5/3/2017
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function update(req, res) {
    delete req.body['_id'];
    Superlier.update({_id: req.params.id}, req.body, function (err) {
        if (err)
            return res.status(status.BAD_REQUEST).send({
                msg: error.set(err),
            });
        res.send({
            msg: message.update_success,
        });
    });
}
/**
 * 
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function show(req, res) {
    Superlier.findOne({_id: req.params.id}, function (err, superlier) {
        if (!err)
            res.send(superlier);
    });
}
/**
 * 
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function destroy(req, res) {
    Superlier.remove({_id: req.params.id}, function (err) {
        if (err)
            return res.status(status.BAD_REQUEST).send({
                msg: error.set(err)
            });
        res.send({
            msg: message.delete_success,
        });
    });
}
module.exports = router;