const { google } = require('googleapis');

const keyFilename = './cloud-storage.json';

// Create a Google Drive API client
async function getDriveFile(driveFileId) {
	try{
			const auth = await google.auth.getClient({ keyFile: keyFilename, scopes: ['https://www.googleapis.com/auth/drive.readonly'] });
		  
			const drive = google.drive({ version: 'v3', auth });
			const response = await drive.files.get({ fileId: driveFileId , alt : 'media'}, { responseType: 'stream' });
			
			return response.data;
	  }catch(error){
		  console.log(error)
	  }
  }
  
  function getDriveFileId(url) {
	  const regex = /[-\w]{25,}/;
	  const match = url.match(regex);
	  if (match) {
		  return match[0];
	  } else {
		  throw new Error('Invalid Google Drive URL');
	  }
  }

  module.exports = {getDriveFileId, getDriveFile};