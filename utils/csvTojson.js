const fs = require('fs');
const csv = require('csv-parser');
const Farmer2024 = require('../models/farmer2024');  
const Crop = require('../models/crops'); 

async function importCSVToMongoDB(csvFilePath) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', async (row) => {
          try {

            const farmerData = {
              farmerName: row['Farmer Name'].trim(),
              fatherName: row['Father Name'].trim(),
              phoneNumber: row['Phone Number'].trim(),
              gender: row['Gender'].trim(),
              dateOfBirth: row['Date of Birth'] ? new Date(row['Date of Birth'].trim()) : null,
              id: row['ID'].trim(),
              village: row['Village'].trim(),
              block: row['Block'].trim(),
              district: row['District'].trim(),
              state: row['State'].trim(),
              postalCode: row['Postal Code'].trim(),
              lat: row['Lat'].trim(),
              long: row['Lng'].trim(),
              feild_number: row['Field No'].trim(),
              area: row['Area'].trim(),
            };

            const findFarmer = await Farmer2024.findOne({phoneNumber: farmerData.phoneNumber})

            if (!findFarmer) {
              var createFarmer = await Farmer2024.create(farmerData)
            }

            const cropData = {
              cropName: row['Crop'].trim(),
              variety: row['Variety'].trim(),
              year: parseInt(row['Year'].trim()),
              season: 'Other',  // Default value, adjust as needed
              ownedLand: parseFloat(row['Acreage'].trim()),
              leasedLand: 0,  // Adjust this if you have leased land data
              yieldPerAcre: 0,  
              cropassurefarmer: createFarmer._id
            };

            const createCrop = await Crop.create(cropData)

            createFarmer.crops.push(createCrop._id)
            await createFarmer.save();

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
  

module.exports = importCSVToMongoDB
