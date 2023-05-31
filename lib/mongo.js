const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const url = 'mongodb://localhost:27017/StarCitizen';


module.exports = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return mongoose;
};

