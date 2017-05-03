/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 28, 2017, 11:39:19 AM
 Author     : nguyen.xuan.tam
 */

mongoose = require('mongoose');
Schema = mongoose.Schema;
var CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
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
});
module.exports = mongoose.model('Customer', CustomerSchema );