const { google } = require('googleapis');
const fs = require('fs');
const pdf2pic = require('pdf2pic');


const getFileIdFromDriveLink = (link) => {
    const match = link.match(/\/file\/d\/([^/]+)/);
  
    if (match && match[1]) {
      return match[1];
    } else {
      return null; // Link doesn't match the expected format
    }
  }

module.exports = { getFileIdFromDriveLink};