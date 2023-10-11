const express = require('express');
const { create, findAll, findById, update, delete_ } = require('../controllers/farmer_controller');
const router = express.Router(); 
const multer = require('multer');
const csv = require('fast-csv');


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


router.post('/farmer-csv', upload.single('file'), async (req, res) => {
    try{
        console.log("it");
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
module.exports = router;