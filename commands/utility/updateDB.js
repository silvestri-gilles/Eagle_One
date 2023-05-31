/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SlashCommandBuilder } = require('discord.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const connecttoMongo = require('../../lib/fillDB');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('updatedb')
        .setDescription('Updates the database with the latest data from the API'),
    async execute(interaction) {
        try {
            // Acknowledge the command immediately
            await interaction.deferReply();
            await connecttoMongo();
            // Follow up with a second message once the operation is complete
            await interaction.editReply('Database update completed successfully.');
        } catch (error) {
            console.error('Error updating database:', error);
            await interaction.editReply('Error updating database.');
        }
    }
};