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
var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quanlity: {
        type: Number,
        default: 0,
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});
module.exports = mongoose.model('Product', ProductSchema);