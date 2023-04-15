const UserModel = require('../models/user.model');


exports.add = async (req, res) => {
    let { firstname, email, phone, gender, dob, city, address, state, zip, userType } = req.body;

    try {
        // Create user
        let db = dob.split("-");
        let newDob = `${db[1]}-${db[0]}-${db[2]}`;
        dob = new Date(newDob);
        await UserModel.create({ firstname, email, phone, gender, dob, city, address, state, zip, userType });
        res.status(200).json({ error: false, message: 'User added successfully' });
    } catch (err) {
        let emailAlreadyExists = "User validation failed: email: email already exists!";
        if (err.message == emailAlreadyExists) {
            res.status(400).json({ error: true, message: "Email already registered" });
        } else res.status(500).json({ error: true, message: err.message });
    }
}
exports.edit = async (req, res) => {
    let { userId, firstname, phone, gender, dob, city, address, state, zip, userType } = req.body;

    try {
        let db = dob.split("-");
        let newDob = `${db[1]}-${db[0]}-${db[2]}`;
        dob = new Date(newDob);
        let userData = { firstname, phone, gender, dob, city, address, state, zip, userType };
        await UserModel.updateOne({ "_id": userId }, { $set: userData });
        res.status(200).json({ error: false, message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.getAll = async (req, res) => {
    try {
        let users = await UserModel.find({});
        res.status(200).json({ error: false, data: users, message: 'All users' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.delete = async (req, res) => {
    let { userId } = req.body;

    try {
        await UserModel.deleteOne({ "_id": userId });
        res.status(200).json({ error: false, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}