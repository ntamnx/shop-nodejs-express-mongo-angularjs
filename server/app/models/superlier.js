/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : May 3, 2017, 11:43:04 AM
 Author     : nguyen.xuan.tam
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SuperlierSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});
module.exports = mongoose.model('Superlier', SuperlierSchema);