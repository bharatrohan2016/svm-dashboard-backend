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

module.exports.filterFarmer = async(req, res) => {
    try{
        let query = req.body;
        let data = await findAll(query);
        res.send({
            result : "success", data
        })
    }
    catch(e){
        console.log(e);
    }
}

module.exports.totalItems = async(req, res) => {
    try {
        console.log("hit-ti");
        const farmers = await farmer2024.find();
        const totalFarmer = farmers.length
        if (farmers.length === 0) {
            return res.status(200).json('No farmer');
        }

        let mostRecentDate = farmers[0].createdAt;

        for (const farmer in farmers) {
            if (farmer.createdAt > mostRecentDate) {
                mostRecentDate = farmer.createdAt;
            }
        }

        const dateSurvey = mostRecentDate;

        console.log(farmers[0].totalAreaUnderCultivation);

        let area = 0;
        let totalArea = 0;

        for (const farmer of farmers) {
            const area = parseFloat(farmer.totalAreaUnderCultivation);
            totalArea += isNaN(area) ? 0 : area;
        }
        console.log({totalFarmer, dateSurvey ,totalArea});
        res.status(200).json({totalFarmer, dateSurvey ,totalArea})
    } catch (error) {
        console.log(error);
        res.status(404).json('Error while fetching')
    }
}


module.exports.getOneFarmer = async(req, res) => {
    try{
        const data = await farmer2024.findById(req.params.id);
        

        res.send({
            result : "success",
            data
        })
    }catch(e){
        console.log(e);
    }
}
