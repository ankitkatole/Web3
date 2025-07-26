const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/BonkBot", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
});
const userModel = mongoose.model('User', UserSchema);

module.exports = {
    userModel
};