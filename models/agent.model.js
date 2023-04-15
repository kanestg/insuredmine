'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');



// AGENT SCHEMA
const agentSchema = new Schema({
    name: { type: String, required: true, trim: true }
}, { timestamps: true });

const AgentModel = mongoose.model('Agent', agentSchema);
agentSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });

// Export model
module.exports = AgentModel;