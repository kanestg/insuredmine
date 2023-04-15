const PolicyModel = require('../models/policy.model');


exports.add = async (req, res) => {
    let { agentId, policy_mode, producer, policy_number, premium_amount, policy_type, company_name, category_name, policy_start_date, policy_end_date, csr } = req.body;

    try {
        let psd = policy_start_date.split("-");
        let newPsd = `${psd[1]}-${psd[0]}-${psd[2]}`;
        policy_start_date = new Date(newPsd);

        let ped = policy_end_date.split("-");
        let newPed = `${ped[1]}-${ped[0]}-${ped[2]}`;
        policy_end_date = new Date(newPed);

        let policyData = { agentId, policy_mode, producer, policy_number, premium_amount, policy_type, company_name, category_name, policy_start_date, policy_end_date, csr }
        await PolicyModel.create(policyData);
        res.status(200).json({ error: false, message: 'Policy added successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.edit = async (req, res) => {
    let { policyId, policy_mode, producer, premium_amount, policy_type, company_name, category_name, policy_start_date, policy_end_date, csr } = req.body;

    try {
        let psd = policy_start_date.split("-");
        let newPsd = `${psd[1]}-${psd[0]}-${psd[2]}`;
        policy_start_date = new Date(newPsd);

        let ped = policy_end_date.split("-");
        let newPed = `${ped[1]}-${ped[0]}-${ped[2]}`;
        policy_end_date = new Date(newPed);
        let policyData = { policy_mode, producer, premium_amount, policy_type, company_name, category_name, policy_start_date, policy_end_date, csr };
        await PolicyModel.updateOne({ "_id": policyId }, { $set: policyData });
        res.status(200).json({ error: false, message: 'Policy updated successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.getAll = async (req, res) => {
    try {
        let policies = await PolicyModel.find({});
        res.status(200).json({ error: false, data: policies, message: 'All policies' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.delete = async (req, res) => {
    let { policyId } = req.body;

    try {
        await PolicyModel.deleteOne({ "_id": policyId });
        res.status(200).json({ error: false, message: 'Policy deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}