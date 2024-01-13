const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modals/UserInfo');
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ProjectUserDetailDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("connected to database"); })
.catch((e) => console.log(e));


app.post('/login', async (req, res) => {
    let { name,email, password } = req.body;
    console.log(email,name);
    try {
        let oldUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
        console.log(oldUser,"old");
        if (!oldUser) {
            return res.json({ status: 'Error in Login', error: 'User does not exist' }).status(409);
        }

        let isPasswordValid = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordValid) {
            return res.json({ status: 'Error in Login', error: 'Invalid Password' }).status(409);
        }

        let token = jwt.sign({ id: oldUser._id }, 'your_jwt_secret', {
            expiresIn: '1h'
        });

        res.json({ status: 'Successfully Logged In', user: oldUser, token });
    } catch (error) {
        console.log(error);
        res.send({ status: 'Error in Login', error: error.toString() }).status(409);
    }
});

app.post('/add-user', async (req, res) => {
    let { username, email, password } = req.body;

    try {
        let oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ status: 'Error in Registration', error: 'Email already in use' }).status(409);
        }

        password = await bcrypt.hash(password, 10);

        let newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        let token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', {
            expiresIn: '1h'
        });

        res.json({ status: 'Successfully Registered', user: newUser, token });
    } catch (error) {
        console.log(error);
        res.send({ status: 'Error in Registration', error: error.toString() }).status(409);
    }
});

app.listen(8081, () => {
    console.log('Server started on port 3000');
});