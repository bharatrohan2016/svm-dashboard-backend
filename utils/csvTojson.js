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
            // Create or find the crop
            const cropData = {
              cropName: row['Crop'].trim(),
              variety: row['Variety'].trim(),
              year: parseInt(row['Year'].trim()),
              season: 'Other',  // Default value, adjust as needed
              ownedLand: parseFloat(row['Acreage'].trim()),
              leasedLand: 0,  // Adjust this if you have leased land data
              yieldPerAcre: 0,  // Default, update if available
            };
  
            const crop = await Crop.findOneAndUpdate(cropData, cropData, { upsert: true, new: true });
  
            // Prepare farmer data
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
            };
  
            // Find and update the farmer, or create a new one if it doesn't exist
            const updatedFarmer = await Farmer2024.findOneAndUpdate(
              { phoneNumber: farmerData.phoneNumber }, 
              { $set: farmerData, $addToSet: { crops: crop._id } }, 
              { upsert: true, new: true }
            );
  
            console.log(`Processed farmer: ${farmerData.farmerName}`);
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
