'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// POLICY SCHEMA
const policySchema = new Schema({
    agentId: { type: Schema.Types.ObjectId, required: true, ref: 'Agent' },
    policy_mode: { type: Number, required: true },
    producer: { type: String, required: true },
    policy_number: { type: String, required: true },
    premium_amount: { type: Number, required: true },
    policy_type: { type: String, required: true },
    company_name: { type: String, required: true },
    category_name: { type: String, required: true },
    policy_start_date: { type: Date, required: true },
    policy_end_date: { type: Date, required: true },
    csr: { type: String, required: true }
}, { timestamps: true });

const PolicyModel = mongoose.model('Policy', policySchema);

// Export model
module.exports = PolicyModel;