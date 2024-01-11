const express = require('express');
const { create, findAll, findById, update, delete_, createMap } = require('../controllers/farmer_controller');
const router = express.Router(); 
const multer = require('multer');
const csv = require('csvtojson');
const fs = require('fs');
const { farmerMap, mapmap } = require('../utils/maps');
const Maps = require('../models/map');

const csvFilePath='../uploads/csv';

//define upload directory for csv files.
const upload = multer({dest : 'uploads/csv'});
const uploadMap = multer({dest: 'uploads/mapcsv'})


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
                console.log(cleanedKey);
                
                //remove the trailing spaces in values.
                jsonItem[key] = jsonItem[key]?.trim();
                
                //map the cleaned value with keyname that is in backend.
                insertedItem[farmerMap[cleanedKey]] = jsonItem[key] !="" ? jsonItem[key] : "-";
            }
            
            const { name, fathersName, tehsil, village, block} = insertedItem;
            const entries = await findAll({ name, fathersName, tehsil, village, block});
            if(entries.length===0){
                //insert the cleaned object in the database.
                const entry = await create(insertedItem);
            }
        }
        const data = await findAll();
        res.send({result : "success", data});
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
        let query = req.body;
        let data = await findAll(query);
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

router.post('/farmer-maps-csv', uploadMap.single('csv'), async (req, res) => {
    try{
        console.log("hit")
        console.log(req.file);
        const jsonArray=await csv().fromFile(req.file.path);
        console.log(jsonArray);
        for(let jsonItem of jsonArray) {
            let insertedItem = {};
            for(let key in jsonItem){
                insertedItem[mapmap[key]] = jsonItem[key]
            }
            const entry = await createMap(insertedItem);
        }

        res.send({result : "success"});
    }catch(e){
        console.log(e);
    }
})

router.get('/farmer-maps-data', async (req, res) => {
    try {
        const data = await Maps.find();
        res.status(200).json(data)
    } catch (e) {
        console.log(e);
        res.status(404).json('Error while fetching')
    }
})


module.exports = router;