/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 28, 2017, 10:56:30 AM
 Author     : nguyen.xuan.tam
 */

/* global ObjectId */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LoginHistorySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    }
});
module.exports = mongoose.model('LoginHistory', LoginHistorySchema);