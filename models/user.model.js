'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');



// USER SCHEMA
const userSchema = new Schema({
    firstname: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    gender: { type: String },
    dob: { type: Date },
    city: { type: String },
    address: { type: String },
    state: { type: String },
    zip: { type: String },
    userType: { type: String }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });

// Export model
module.exports = UserModel;