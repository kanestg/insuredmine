'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// ACCOUNT SCHEMA
const accountSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    account_name: { type: String, required: true, trim: true },
    account_type: { type: String, required: true, trim: true }
}, { timestamps: true });

const AccountModel = mongoose.model('Account', accountSchema);

// Export model
module.exports = AccountModel;