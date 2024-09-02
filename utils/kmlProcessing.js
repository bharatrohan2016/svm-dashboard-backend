const XmlStream = require('xml-stream');
const { getDriveFile, getDriveFileId } = require('./googleDriveFunctions');

// Stream the KML file from Google Drive and extract coordinates
const streamKMLFile = (driveFileUrl) => {
    try{
        const fileId = getDriveFileId(driveFileUrl);

        return new Promise(async (resolve, reject) => {
            const data = await getDriveFile(fileId)
    
            // This part converts the Axios stream to a Node.js stream
            // which is necessary for xml-stream to work properly
            const xml = new XmlStream(data);
            
            // Here you tell xml-stream to gather all text nodes inside <coordinates>
            xml.collect('coordinates');

             // This event triggers every time a </LinearRing> tag is closed
            let coordinates = [];
            xml.on('endElement: LinearRing', function(item) {
                console.log(item);
    
                // Check if the <coordinates> element exists to avoid null reference errors
                if (item.coordinates) {
                    
                    for(let coordinate of item.coordinates){
                        const rawCoordinates = coordinate.trim();
                        const coordinatesArray = rawCoordinates.split(' ').map(coordString => {
                            // Split each set of coordinates (lon, lat, alt) and convert to numbers
                            const parts = coordString.split(',').map(Number);
                            return  [parts[1], parts[0]]; //stored in lat, lng format
                        });
                        coordinates.push(coordinatesArray);
                    }
                }
				console.log(coordinates);
            });

            xml.on('end', () => {
                resolve(coordinates); // Resolve the Promise with all coordinates once the stream ends
            });

            xml.on('error', (error) => {
                reject(error); // Reject the Promise if an error occurs
            });
        })
    }catch(error){
        console.error('Error fetching or parsing the file:', error);
    }
};


module.exports = {streamKMLFile};