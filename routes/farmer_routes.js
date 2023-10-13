const express = require('express');
const { create, findAll, findById, update, delete_ } = require('../controllers/farmer_controller');
const router = express.Router(); 
const multer = require('multer');
const csv = require('csvtojson');
const fs = require('fs');
const { farmerMap } = require('../utils/maps');

const csvFilePath='../uploads/csv';

//define upload directory for csv files.
const upload = multer({dest : 'uploads/csv'});


router.post('/farmer', async(req, res) => {
    try{
        console.log(req.body);
        const data = await create(req.body);
        res.send({
            result : 'success', data 
        })
    }
    catch(e){
        console.log(e);
    }
})


router.post('/farmer-csv', upload.single('csv'), async (req, res) => {
    try{
        
        console.log(req.file);
        const jsonArray=await csv().fromFile(req.file.path);
    
        for(let jsonItem of jsonArray) {
            let insertedItem = {};
            for(let key in jsonItem){
                //remove the spaces and make lowercase for map purpose.
                let cleanedKey = key.trim().toLowerCase();
                
                //remove the trailing spaces in values.
                jsonItem[key] = jsonItem[key]?.trim();
                
                //map the cleaned value with keyname that is in backend.
                insertedItem[farmerMap[cleanedKey]] = jsonItem[key] !="" ? jsonItem[key] : "-";
            }
            
            //insert the cleaned object in the database.
            const entry = await create(insertedItem);
        }

        res.send({result : "success"});
    }catch(e){
        console.log(e);
    }
})

router.get('/farmer', async(req, res) => {
    try{
        const data = await findAll();
        res.send({
            result : "success", data
        })
    }
    catch(e){
        console.log(e);
    }
})


router.post('/filter-farmers', async(req, res) => {
    try{
        const { village, source, crops } = req.body;
        let query = {};

        if(village) {
            query['village'] = village;
        }

        let data = await findAll(query);

        //crops are string data type. Need to filter after fetching.
        if(crops){
             data = data.filter((item) => item.crops?.toLowerCase().includes(crops) === true);
        }

        data.sort();
        
        res.send({
            result : "success", data
        })
    }
    catch(e){
        console.log(e);
    }
})

router.get('/farmer/:id', async(req, res) => {
    try{
        const data = await findById(req.params.id);
        res.send({
            result : "success",
            data
        })
    }catch(e){
        console.log(e);
    }
})

router.put('/farmer/:id', async(req, res) => {
    try{
        const data = await update(req.params.id, req.body);
        res.send({
            result : "success"
        })
    }catch(e) {
        console.log(e);
    }
})

router.delete('/farmer/:id', async(req, res) => {
    try{
        const data = await delete_(req.params.id);
        res.send({
            result : "success"
        })
    }catch(e) {
        console.log(e);
    }
})

module.exports = router;