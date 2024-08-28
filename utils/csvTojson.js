const fs = require('fs');
const csv = require('csv-parser');
const Farmer2024 = require('../models/farmer2024');  
const Crop = require('../models/crops'); 
const Survey = require('../models/survey')

async function importFarmerCSVToMongoDB(csvFilePath) {
  return new Promise((resolve, reject) => {
    const farmers = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const farmerData = {
          farmerName: row['Farmer Name'].trim(),
          phoneNumber: row['Phone Number']?.trim(),
          gender: row['Gender']?.trim(),
          dateOfBirth: row['Date of Birth'] ? new Date(row['Date of Birth']?.trim()) : null,
          village: row['Village'].trim(),
          block: row['Block'].trim(),
          district: row['District'].trim(),
          state: row['State'].trim(),
          postalCode: row['Postal Code']?.trim(),
          lat: row['Lat']?.trim(),
          long: row['Lng']?.trim(),
          area: row['Area']?.trim()
        };
        farmers.push(farmerData);
      })
      .on('end', async () => {
        for (const farmerData of farmers) {
          try {
            const generateId = async () => {
              const { farmerName, village } = farmerData;
              const villagePart = village[0] + village[1].toUpperCase();
              const farmerNamePart = farmerName[0] + farmerName[1].toUpperCase();

              let uniqueId = 'MLRIBH' + villagePart + farmerNamePart;
              const regex = new RegExp(uniqueId, 'i'); // 'i' for case-insensitive search
              const doesExist = await Farmer2024.find({ excel_id: { $regex: regex } });

              if (doesExist.length > 0) {
                uniqueId += doesExist.length < 10 ? `0${doesExist.length}` : `${doesExist.length}`;
              } else {
                uniqueId += '00';
              }

              return uniqueId;
            };

            farmerData.excel_id = await generateId();

            const findFarmer = await Farmer2024.findOne({
              farmerName: farmerData.farmerName,
              excel_id: farmerData.excel_id
            });

            if (!findFarmer) {
              await Farmer2024.create(farmerData);
            } 
          } catch (error) {
            console.error('Error processing row:', error.message);
          }
        }
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error);
      });
  });
}


async function importCropCSVToMongoDB(csvFilePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          
          const cropData = {
            cropName: row['Crop'].trim(),
            variety: row['Variety'].trim(),
            year: parseInt(row['Year'].trim()),
            majorbuyer: row['Major Buyer'].trim(),
            season: 'Other',  // Default value, adjust as needed
            ownedLand: parseFloat(row['Acreage'].trim()),
            leasedLand: 0,  // Adjust this if you have leased land data
            yieldPerAcre: 0,  
            // cropassurefarmer: findFarmer._id,
            excel_id: row['ID'].trim(),
            farmerName: row['Farmer Name'].trim()
          };

          const findFarmer = await Farmer2024.findOne({excel_id: cropData.excel_id, farmerName: cropData.farmerName})

          if (findFarmer) {
            const createCrop = await Crop.create(cropData)
            createCrop.cropassurefarmer = findFarmer._id
            await createCrop.save()

            findFarmer.crops.push(createCrop._id)
            await findFarmer.save();
          }

        } catch (error) {
          console.error('Error processing row:', error.message);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error);
      });
  });
}

async function importSurveyCSVToMongoDB(csvFilePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          const surveyData = {
            excel_id: row['ID'].trim(),
            farmerName: row['Farmer Name'].trim(),
            // farmer_id: findFarmer.farmer_id,
            survey_date: row['Date Of Survey'].trim(),
            map_link: row['Link'].trim(),  // Default value, adjust as needed
            advisory: row['Advisory'].trim()
          };

          const findFarmer = await Farmer2024.findOne({excel_id: surveyData.excel_id, farmerName: surveyData.farmerName})

          if (findFarmer) {
            const createSurvey = await Survey.create(surveyData)
            createSurvey.farmer_id = findFarmer._id
            await createSurvey.save()

            findFarmer.survey.push(createSurvey._id)
            await findFarmer.save();
          }

        } catch (error) {
          console.error('Error processing row:', error.message);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error);
      });
  });
}
  

module.exports = { 
  importFarmerCSVToMongoDB ,
  importCropCSVToMongoDB,
  importSurveyCSVToMongoDB
}
