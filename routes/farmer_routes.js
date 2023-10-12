const express = require('express');
const { create, findAll, findById, update, delete_, createMap } = require('../controllers/farmer_controller');
const router = express.Router(); 
const multer = require('multer');
const csv = require('csvtojson');
const fs = require('fs');
const { farmerMap, mapmap } = require('../utils/maps');

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
        console.log("hit")
        console.log(req.file);
        const jsonArray=await csv().fromFile(req.file.path);
        console.log(jsonArray);
        for(let jsonItem of jsonArray) {
            let insertedItem = {};
            for(let key in jsonItem){
                insertedItem[farmerMap[key]] = jsonItem[key]
            }
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

module.exports = router;