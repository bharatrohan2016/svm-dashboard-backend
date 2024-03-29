const farmer = require("../models/farmer")

const totalItems = async(req, res) => {
    try {
        console.log("hit-ti");
        const farmers = await farmer.find();
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


module.exports = {totalItems}
