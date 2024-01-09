const mongoose = require('mongoose');

const LoggingIn = new mongoose.Schema(
    {
        user_name: String,
        user_id: String,
        useremail: String,
        password: String,
        usercompanyname: String,
        role: String,
    },
    {
        collection: "UserInfo",
    }
    
);

const Login = mongoose.model('UserInfo', LoggingIn)

module.exports = Login;