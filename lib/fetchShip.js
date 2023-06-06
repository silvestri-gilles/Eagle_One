//fetch ship entry from database by name
const mongo = require('./mongo');
const shipSchema = require('./schemas/ship-schema');

async function fetchShipFromDB(name) {
    const mongoose = await mongo();
    let shipData;

    try {
        shipData = await shipSchema.findOne({ shipName: name });
    } catch (error) {
        console.error('Error fetching ship from DB:', error);
        throw error; // Throw the error so the calling function can catch it
    }

    return shipData; // Return the fetched ship data
}

module.exports = fetchShipFromDB;
