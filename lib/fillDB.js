/*const urlList = ["https://api.star-citizen.wiki/api/vehicles/Corsair?locale=en_EN",
"https://api.star-citizen.wiki/api/vehicles/cutlass-black?locale=en_EN"]; */
const fs = require('fs');
const mongo = require('./mongo');
const shipSchema = require('./schemas/ship-schema');
// /workspaces/EagleTwo/lib/data

/*
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
                          
                          await new shipSchema(newship).save();
                        }
                        else {
                            console.log('Entry ' + data.data.id + ' already exists in database.');
                        }
                    });
            }
        } finally {
            mongoose.connection.close();
        }
    });
} 

*/

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


//connecttoMongo();
module.exports = connecttoMongo;