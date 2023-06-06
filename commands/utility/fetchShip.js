const { SlashCommandBuilder } = require('@discordjs/builders');
const  fetchShipFromDB = require('../../lib/fetchShip');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetchship')
        .setDescription('Fetches a ship from the database')
        .addStringOption(option => 
            option.setName('shipname')
                .setDescription('Name of the ship to fetch')
                .setRequired(true)),
    async execute(interaction) {
        const shipName = interaction.options.getString('shipname');
        try {
            // Acknowledge the command immediately
            await interaction.deferReply();
            const shipData = await fetchShipFromDB(shipName);
            if (shipData) {
                const shipDataString = JSON.stringify(shipData, null, 4);
                await interaction.editReply(`Fetched ship data: \`\`\`${shipDataString}\`\`\``);
            } else {
                await interaction.editReply(`No data found for ship ${shipName}.`);
            }
        } catch (error) {
            console.error('Error fetching ship data:', error);
            await interaction.editReply('Error fetching ship data.');
        }
    }
};
