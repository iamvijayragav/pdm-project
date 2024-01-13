const mongoose = require('mongoose');
const userModel = new mongoose.Schema(
    {
        name: String,
        user_id: String,
        email: String,
        password: String,
        company_name: String,
        role: String,
    }, {
        collection:'UserInfo',
    }
);

const User = mongoose.model('UserInfo', userModel)

module.exports = User;