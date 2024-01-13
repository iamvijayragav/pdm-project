const mongoose = require('mongoose');
const UserModel = mongoose.Schema ({
        name: String,
        user_id: String,
        email: String,
        password: String,
        company_name: String,
        role: String,
    })

const AddUser = mongoose.model('UserInfo', UserModel);
module.exports = AddUser;