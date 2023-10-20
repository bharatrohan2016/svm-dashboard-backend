

const express = require('express');
const { saveFilefromGoogleDrive, getFileIdFromDriveLink } = require('../utils/importantFunctions');
const router = express.Router();

router.get('/save-file-from-gdrive', async(req, res) => {
    const fileUrl = req.body.fileUrl;
    
    //fetch file id from file url
    const fileId = getFileIdFromDriveLink(fileUrl);
    console.log(fileId);
   
    const k = await saveFilefromGoogleDrive(fileId);

    res.send({
        result : 'success'
    })

})

module.exports = router;