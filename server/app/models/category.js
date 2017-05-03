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
var CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('Category', CategorySchema);