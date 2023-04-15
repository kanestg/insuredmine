'use strict';

const router = require("express").Router();
const multer = require('multer');
const csv = require('csvtojson');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
});
const uploads = multer({ storage: storage });

// Importing controllers
const user = require('../controllers/user.controller');
const account = require('../controllers/account.controller');
const agent = require('../controllers/agent.controller');
const policy = require('../controllers/policy.controller');

// Importing models
const UserModel = require('../models/user.model');
const AccountModel = require('../models/account.model');
const AgentModel = require('../models/agent.model');
const PolicyModel = require('../models/policy.model');


router.post('/upload-csv', uploads.single('csvFile'), (req, res) => {
    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (let data of response) {
            // Create user
            let { firstname, email, phone, gender, dob, city, address, state, zip, userType } = data;
            let db = dob.split("-");
            let newDob = `${db[1]}-${db[0]}-${db[2]}`;
            dob = new Date(newDob);
            const createdUser = await UserModel.create({ firstname, email, phone, gender, dob, city, address, state, zip, userType });
            // Create user account
            let { account_name, account_type } = data;
            await AccountModel.create({ userId: createdUser._id, account_name, account_type });
            // Create agent
            let { agent } = data;
            const createdAgent = await AgentModel.create({ name: agent });
            // Create policy
            let { policy_mode, producer, policy_number, premium_amount, policy_type, company_name, category_name, policy_start_date, policy_end_date, csr } = data;
            let psd = policy_start_date.split("-");
            let newPsd = `${psd[1]}-${psd[0]}-${psd[2]}`;
            policy_start_date = new Date(newPsd);

            let ped = policy_end_date.split("-");
            let newPed = `${ped[1]}-${ped[0]}-${ped[2]}`;
            policy_end_date = new Date(newPed);
            await PolicyModel.create({ agentId: createdAgent._id, policy_mode, producer, policy_number, premium_amount, policy_type, company_name, category_name, policy_start_date, policy_end_date, csr });
        }
        res.status(200).json({ error: false, message: 'CSV uploaded successfully' });
    });
});


// User Routes
router.post('/user/add', user.add);
router.post('/user/update', user.edit);
router.get('/user/get-all', user.getAll);
router.post('/user/delete', user.delete);
// Account Routes
router.post('/account/add', account.add);
router.post('/account/update', account.edit);
router.get('/account/get-all', account.getAll);
router.post('/account/delete', account.delete);
// Agent Routes
router.post('/agent/add', agent.add);
router.post('/agent/update', agent.edit);
router.get('/agent/get-all', agent.getAll);
router.post('/agent/delete', agent.delete);
// Policy Routes
router.post('/policy/add', policy.add);
router.post('/policy/update', policy.edit);
router.get('/policy/get-all', policy.getAll);
router.post('/policy/delete', policy.delete);

module.exports = router;