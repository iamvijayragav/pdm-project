const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var ModalData = require('../modals/CategoryModal');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(express.json);

const ConnectionString = 'mongodb://localhost:27017';
const Url = "mongodb://localhost:27017/ProjectUserDetailDatabase";

mongoose.connect(Url)
    .then(()=>console.log("Connected To Database"))
    .catch((e) => console.log(e));
    
app.post('/login', async (req, res) => {
    let email = req.body.useremail;
    let password = req.body.password;
    try {
        const OldUser = await ModalData.findOne({ useremail: email });
        if (password && password === OldUser.password) {
            return res.json(OldUser).status(200);
        }
    } catch (err) {
        console.log(err);
        return res.send({ status: 'Error' }).status(409);
    }
});


app.post("/verify", async (req, res) => {
    const { email, _id, currRole } = req.body;

    try {
        const OldUser = await ModalData.findOne({ _id });

        if (OldUser && OldUser.role === currRole) {
            //todo Hashing....
            return res.send({ validUser: true })
        } else {
            return res.send({ validUser: false }).status(403)
        }
    } catch (err) {
        res.send({ status: "Error" }).status(409);
    }
})
app.listen(8080, () =>
    console.log("Server Started in 8080"));