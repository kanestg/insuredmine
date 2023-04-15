const AccountModel = require('../models/account.model');


exports.add = async (req, res) => {
    let { userId, account_name, account_type } = req.body;

    try {
        await AccountModel.create({ userId, account_name, account_type });
        res.status(200).json({ error: false, message: 'Account added successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.edit = async (req, res) => {
    let { accountId, account_name, account_type } = req.body;

    try {
        let accountData = { account_name, account_type };
        await AccountModel.updateOne({ "_id": accountId }, { $set: accountData });
        res.status(200).json({ error: false, message: 'Account updated successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.getAll = async (req, res) => {
    try {
        let accounts = await AccountModel.find({});
        res.status(200).json({ error: false, data: accounts, message: 'All accounts' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.delete = async (req, res) => {
    let { accountId } = req.body;

    try {
        await AccountModel.deleteOne({ "_id": accountId });
        res.status(200).json({ error: false, message: 'Account deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}