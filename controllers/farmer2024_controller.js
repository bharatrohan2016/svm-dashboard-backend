const farmer2024 = require('../models/farmer2024')

module.exports.findFarmer = async (req, res) => {
    try {
        const data = await farmer2024.find().populate('crops')
        res.status(201).json({ data })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Please check console' })
    }
}