const farmer2024 = require('../models/farmer2024')
const Crop=require('../models/crops')
const Maps = require('../models/map')
const { Parser } = require('json2csv');

module.exports.findFarmer = async (req, res) => {
    try {
        const data = await farmer2024.find().populate([{path : 'crops',  select : 'cropName'}, { path : 'maps', select : 'area' }])
        res.status(201).json({ data })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Please check console' })
    }
}

module.exports.filterFarmer = async (req, res) => {
    let {crops} = req.body;
    
    try {
        let data = await farmer2024.find({}).populate([{ path : 'crops', match : {cropName : crops}, select : 'cropName' }, { path : 'maps', select : 'area' }])
        data = data.filter((item) => item.crops.length > 0);
        
        res.send({
            result: "success", data
        })
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.totalItems = async (req, res) => {
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
        console.log({ totalFarmer, dateSurvey, totalArea });
        res.status(200).json({ totalFarmer, dateSurvey, totalArea })
    } catch (error) {
        console.log(error);
        res.status(404).json('Error while fetching')
    }
}


module.exports.getOneFarmer = async (req, res) => {
    try {
        console.log("hit")
        const data = await farmer2024.findOne({ _id: req.params.id }).populate([{path : 'crops'}, {path : 'maps'}, {path : 'survey'}]);
        console.log(data);
        res.send({
            result: "success",
            data
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports.cropwiseFarmernumber = async (req, res) => {
    try {
        const results = await Crop.aggregate([
            {
                $group: {
                    _id: "$cropName",  // Group by cropName
                    count: { $sum: 1 }  // Count the number of documents in each group
                }
            },
            {
                $sort: { count: -1 }  // Sort by count in descending order (optional)
            }
        ]);
        const gingerCount=results.filter(obj=>obj._id.toLowerCase()=='ginger');
        const paddyCount=results.filter(obj=>obj._id.toLowerCase()=='paddy');
        const cropCount={ginger:gingerCount[0].count,paddy:paddyCount[0].count};
        res.send(cropCount);
    } catch (err) {
        console.error('Error fetching crop counts:', err);
    }
}

module.exports.getFarmerCropAreaCSV = async (req, res) => {
    try {
        const result = await Maps.find({});
        const data = [];
    
        for (let i = 0; i < result.length; i++) {
            const findFarmer = await farmer2024.findOne({ excel_id: result[i].excel_id });
            const farmerName = findFarmer?.farmerName;
    
            let existingEntry = data.find(
                (entry) => entry.excel_id === result[i].excel_id && entry.crop_name === result[i].crop_name
            );
    
            if (existingEntry) {
                existingEntry.area += result[i].area;
            } else {
                data.push({
                    excel_id: result[i].excel_id,
                    farmername: farmerName,
                    area: result[i].area,
                    crop_name: result[i].crop_name,
                });
            }
        }
    
        // Convert the data array to CSV
        const fields = ['excel_id', 'farmername', 'area', 'crop_name']; 
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);
    
        res.header('Content-Type', 'text/csv');
        res.attachment('farmers_data.csv'); 
        res.status(200).send(csv);
    
    } catch (error) {
        console.error('Error fetching crop counts:', error);
        res.status(501).json('Check Console');
    }
    
}

module.exports.getVillageWiseArea= async (req,res) =>{
    try{
        // farmer2024.aggregate([
        //     {
        //       $lookup: {
        //         from: 'Maps', // The target collection
        //         localField: 'maps', // Field from the Farmer collection
        //         foreignField: '_id', // Field from the Maps collection
        //         as: 'mapDetails' // The name of the field to add with matched documents
        //       }
        //     }
            // ,
            // {
            //   $unwind: '$mapDetails' // Deconstruct the mapDetails array
            // }
            // ,
            // {
            //   $group: {
            //     _id: '$village', // Group by the village field
            //     totalArea: { $sum: '$mapDetails.area' } // Sum up the area field from mapDetails
            //   }
            // }
        //   ]).exec()
        //     .then(results => {
        //       console.log(results); // Print the aggregated results
        //       res.status(200).json("api hit ho gyi")
        //     })
        //     .catch(err => {
        //       console.error(err);
        //     });
        // const data = await farmer2024.find({}).populate('maps').
        // console.log(data);
        // res.status(200).json("api hit")
        const farmers = await farmer2024.find({})
      .populate('maps') // Populate the maps field
      .exec();

    // Compute total area for each village
    const villageAreaMap = {};

    farmers.forEach(farmer => {
      const village = farmer.village;
      const totalArea = farmer.maps.reduce((sum, map) => sum + (map.area || 0), 0);

      if (villageAreaMap[village]) {
        villageAreaMap[village] += totalArea;
      } else {
        villageAreaMap[village] = totalArea;
      }
    });

    // Convert the result to an array of objects
    const result = Object.keys(villageAreaMap).map(village => ({
      village,
      totalArea: villageAreaMap[village]
    }));

    // console.log(result);
    res.status(200).json(result)
    }
    catch(e){
        console.log("GetVillageWiseArea function error: ",e)
        res.status(501).json(e)
    }
}

module.exports.getVillageWiseFarmerNumber= async (req,res) =>{
    try{
        
        farmer2024.aggregate([
            {
              $group: {
                _id: "$village", // Group by the 'village' field
                count: { $sum: 1 } // Count the number of documents per group
              }
            },
            {
              $sort: { count: -1 } // Optional: Sort by count in descending order
            }
          ]).exec()
            .then(results => {
              console.log(results); // Print results as an array
              res.status(200).json(results)
            }).catch(err => {
                console.error(err);
              });
    }
    catch(e){
        console.log("village wise farmer number function error: ",e)
        res.status(501).json(e)
    }
}

