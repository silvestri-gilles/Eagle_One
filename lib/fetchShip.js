//fetch ship entry from database by name
const mongo = require('./mongo');
const shipSchema = require('./schemas/ship-schema');

async function fetchShipFromDB(interaction, shipName) {
    let shipData; 

    try {
        shipData = await shipSchema.findOne({ name: shipName }); 
    } catch (error) {
        console.error('Error fetching ship from DB:', error);
        await interaction.reply(`Error fetching ship data.`);
        return;
    }

    if (shipData) {
        await interaction.reply(`Fetched ship data: ${JSON.stringify(shipData)}`);
    } else {
        await interaction.reply(`No data found for ship ${shipName}.`);
    }
}

module.exports = fetchShipFromDB;
