const fs = require('fs');
const mongo = require('./mongo');
const shipSchema = require('./schemas/ship-schema');

const connecttoMongo = async () => {
    await mongo().then(async (mongoose) => {
        try {
            const urlList = JSON.parse(fs.readFileSync('lib/data/list.json', 'utf-8'));
            for (const url of urlList) {
                await fetch(url)
                    .then(response => response.json())
                    .then(async data => {
                        const existingShip = await shipSchema.findOne({ shipsID: data.data.id });
                        if (!existingShip) {
                            console.log('New entry ' + data.data.id + ' found, adding to database...');
                            const newship = new shipSchema({
                                shipsID: data.data.id,
                                shipName: data.data.name,
                                slug: data.data.slug,
                                version: data.data.version
                            });

                            await newship.save();
                        } else {
                            console.log('Entry ' + data.data.id + ' already exists in database.');
                        }
                    });
            }
        } catch (error) {
            console.error('Error in connecttoMongo:', error);
        }
    });
}

module.exports = connecttoMongo;