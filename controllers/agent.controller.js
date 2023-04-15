const AgentModel = require('../models/agent.model');


exports.add = async (req, res) => {
    let { name } = req.body;

    try {
        await AgentModel.create({ name });
        res.status(200).json({ error: false, message: 'Agent added successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.edit = async (req, res) => {
    let { agentId, name } = req.body;

    try {
        await AgentModel.updateOne({ "_id": agentId }, { $set: { name } });
        res.status(200).json({ error: false, message: 'Agent updated successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.getAll = async (req, res) => {
    try {
        let agents = await AgentModel.find({});
        res.status(200).json({ error: false, data: agents, message: 'All agents' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
exports.delete = async (req, res) => {
    let { agentId } = req.body;

    try {
        await AgentModel.deleteOne({ "_id": agentId });
        res.status(200).json({ error: false, message: 'Agent deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}