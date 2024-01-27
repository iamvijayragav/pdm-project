const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 8081;
const { login, FetchProject, FetchUser, AddingProject, AddUser } = require('../Controller/LoginController');
const Project = require('../modals/Project');
const User = require("../modals/UserInfo");
const mongoUrl = "mongodb://localhost:27017/ProjectUserDetailDatabase";
const FactoryModel = require('../modals/FactoryModel');


mongoose.connect(mongoUrl);

const mainDbConnection = mongoose.connection;

mainDbConnection.on('error', (err) => {
    console.error(`Error connecting to Master database: ${err}`);
});

mainDbConnection.once('open', () => {
    console.log('Connected to Mater database');
});

app.use(cors());
app.use(bodyParser.json());

const createConnection = (dbName) => {
    return mongoose.createConnection(`mongodb://localhost:27017/${dbName}`);
};

let currentTempDbConnection = null;
app.get("/api/dynamic-switch/:db", async (req, res) => {
    const { db } = req.params;

    if (currentTempDbConnection) {
        currentTempDbConnection.close();
        console.log('Closed current temporary database connection');
    }

    currentTempDbConnection = createConnection(db);

    currentTempDbConnection.on('error', (err) => {
        console.error(`Error connecting to dynamic database ${db}: ${err}`);
        res.status(500).json({ error: `Error connecting to dynamic database ${db}` });
    });

    currentTempDbConnection.once('open', () => {
        console.log(`Connected to dynamic database: ${db}`);
        res.status(200).json({ message: `Connected to dynamic database: ${db}` });
    });
});

app.get("/api/dynamic-category/:category/:db", async (req, res) => {

    var WholeData = [];


    const { category, db } = req.params;
    console.log(category, db, "cat");
    if (!currentTempDbConnection) {
        currentTempDbConnection = createConnection(db);
    }

    const DocumentSchema = require("../modals/Document");
    // const DocumentContent = currentTempDbConnection.model("Document_Content", documentContent);
    const DocumentContent = FactoryModel(DocumentSchema, currentTempDbConnection, "Document_Content");

    const CategorySchema = require('../modals/CategoryModal');

    const CategoryContent = FactoryModel(CategorySchema(category), currentTempDbConnection, category);

    const StakeHolderSchema = require("../modals/StakeHolder");

    const StakeHolderContent = FactoryModel(StakeHolderSchema, currentTempDbConnection, "Stake_Holder");

    try {
        const CategoryData = await CategoryContent.find({});
        const DocumentData = await DocumentContent.find({});
        const StakeHolderData = await StakeHolderContent.find({});

        const combinedData = CategoryData.map(categoryItem => {
            const matchingDocument = DocumentData.find(documentItem => documentItem.New_SDRL_Code === categoryItem.New_SDRL_Code);
            const matchingStakeHolder = StakeHolderData.find(stakeItem => stakeItem.New_SDRL_Code === categoryItem.New_SDRL_Code);

            return {
                ...categoryItem.toObject(),
                ...(matchingDocument ? matchingDocument.toObject() : {}),
                ...(matchingStakeHolder ? matchingStakeHolder.toObject() : {})
            };
        });
        console.log("Data", combinedData[10]);
        res.status(200).json(combinedData);
    } catch (err) {
        console.error("Error in fetching category", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


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


app.post("/add-project", AddingProject);

app.post('/add-user', AddUser)

app.get("/api/fetch-user", FetchUser);

app.get("/api/fetch-project", FetchProject);

app.post("/api/delete-user", async (req, res) => {
    const { email } = req.body;
    try {
        const DeletedUser = await User.findOneAndDelete({ email });
        if (!DeletedUser) {
            res.status(404).json({ error: 'User Not Found' })
        }
        res.json(DeletedUser);
    } catch (err) {
        res.status(500).json({ error: " Error in delete user" })

    }
})

app.post("/api/upload-access", async (req, res) => {
    const { Access, projectCode, userId } = req.body;
    try {
        const filter = { $and: [{ user_id: userId }, { project_code: projectCode }] }
        const update = {
            project_code: projectCode,
            user_id: userId,
            access: Access
        };

        const options = { upsert: true, new: true };
        const UpdatedAccess = await Project.findOneAndUpdate(filter, update, options);
        res.status(200).json(UpdatedAccess);
    } catch (err) {
        console.log("Error in Giving Access", err);
        res.send({ error: "Error in Giving Permissions" })
    }
})


app.get('/api/fetch-project-access', async (req, res) => {
    try {
        const ProjectAccess = await Project.find({});
        res.status(200).json(ProjectAccess);
    } catch (err) {
        console.log("Error in Fetching Access", err);
        res.status(500).json({ error: "Error in Fetching Access." })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});