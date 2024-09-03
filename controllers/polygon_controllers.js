const Farmer2024 = require("../models/farmer2024")

const fetchPolygons = async (req, res) => {
	try{
		const data = await Farmer2024.find({}).populate('maps');
		res.send({ result : 'success', data })
	}catch(error){
		console.log(error);
        res.status(500).json({ message: 'Please check console' })
	}
}

module.exports = {fetchPolygons};