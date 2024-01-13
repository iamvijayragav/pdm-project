
const { login } = require('../Controller/LoginController');
const express = require("express");
const app = express()
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require('cors');
const User = require("../modals/UserInfo");

const AddProject = require('../modals/AddProject');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json());

const ChangeUrl = 'mongodb://localhost:27017/';
const mongoUrl = "mongodb://localhost:27017/ProjectUserDetailDatabase";
mongoose.connect(mongoUrl)
    .then(() => { console.log("connected to database"); })
    .catch((e) => console.log(e));

app.post("/login", login);

app.post("/verify", async (req, res) => {
    const { _id, currRole } = req.body;
    try {
        const oldUser = await User.findOne({ _id });
        if (oldUser && oldUser.role === currRole) {
            //todo hashing
            return res.send({ validUser: true });
        } else {
            return res.send({ validUser: false }).status(403);
        }
    } catch (error) {
        console.log(error);
        res.send({ status: "error" }).status(409)
    }
});


app.post("/add-project", async (req, res) => {

    const { projectCode, projectName } = req.body;
    const dataBase = projectCode + '_' + projectName;
    console.log(projectCode, projectName, dataBase);
    try {
        const newProject = new AddProject({
            projectcode: projectCode,
            projectname: projectName,
            database: dataBase,
        })
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);

    } catch (err) {
        console.error("Error Adding Projects: ", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }


});

app.post('/add-user', async (req, res) => {
    const {
        UserName,
        UserId,
        Email,
        Password,
        CompanyName,
        Role,
    } = req.body;

    try {
        const filter = { $or: [{ email: Email }, { user_id: UserId }] };
        const update = {
            name: UserName,
            user_id: UserId,
            email: Email,
            password: Password,
            company_name: CompanyName,
            role: Role,
        };
        const options = { upsert: true, new: true };
        const updatedUser = await User.findOneAndUpdate(filter, update, options);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error Adding Users: ", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post("/api/fetch-project", async (req, res) => {
    try {
        const Project = await User.find({});
        res.status(200).json(Project);
    } catch (err) {
        console.log("Error in Fetching Projects", err);
        res.status(500).json({ error: "Error in Fetching Projects." })
    }
})

app.listen(8081, () => {
    console.log("server started");
});