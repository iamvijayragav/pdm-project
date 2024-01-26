
const express = require("express");
const app = express()
// const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require('cors');

const { login,FetchProject, FetchUser ,AddingProject, AddUser} = require('../Controller/LoginController');
const Project = require('../modals/Project');
const User = require("../modals/UserInfo");
const AddProject = require('../modals/AddProject'); 

const {connectToDatabase, mongoose} = require("../Controller/ConnectToDatabase");

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json());

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


app.post("/add-project", AddingProject);

app.post('/add-user', AddUser)

app.post("/api/fetch-user", FetchUser);

app.post("/api/fetch-project", FetchProject);

app.post("/api/delete-user", async (req, res) => {
    const { email } = req.body;
    try {
        const DeletedUser = await User.findOneAndDelete({ email });
        if (!DeletedUser) {
            res.status(404).json({error:'User Not Found'})
        }
        res.json(DeletedUser);
    } catch (err) {
        res.status(500).json({error:" Error in delete user"})
        
    }
})

app.post("/api/upload-access", async (req, res) => {
    const { Access, projectCode, userId } = req.body;
    try {
        const filter = {$and: [{ user_id : userId } , { project_code : projectCode }] }
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
        res.send({error : "Error in Giving Permissions"})
    }
})


app.post('/api/fetch-project-access', async (req, res) => {
    try {
        const ProjectAccess = await Project.find({});
        res.status(200).json(ProjectAccess);
    } catch (err) {
        console.log("Error in Fetching Access", err);
        res.status(500).json({ error: "Error in Fetching Access." })
    }
});
const DatabaseConnection = async (dbname) => {
    try {
        // Replace this connection URL with your actual MongoDB connection URL
        await mongoose.connect(`mongodb://localhost:27017/${dbname}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log(`Connected to dynamic database: ${dbname}`);
    } catch (error) {
        console.error(`Error connecting to dynamic database ${dbname}: ${error.message}`);
        throw error;
    }
};
// app.post("/api/dynamic-switch/:db/:category", async (req, res) => {
//     const { db, category } = req.params;
//     try {
//         await DatabaseConnection(db);
//         res.status(200).json(Data);
//     } catch (err) {
//         console.error("Error in Switch DB:", err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });






const createConnection = (dbName) => {
    return mongoose.createConnection(`mongodb://localhost:27017/${dbName}`);
};

app.post("/api/dynamic-switch/:db/:category", async (req, res) => {
    const { db, category } = req.params;
    console.log(db,category);

    // Use the provided database name to create a dynamic connection
    const dynamicDbConnection = createConnection(db);

    dynamicDbConnection.on('error', (err) => {
        console.error(`Error connecting to dynamic database ${db}: ${err}`);
        res.status(500).json({ error: `Error connecting to dynamic database ${db}` });
    });

    dynamicDbConnection.once('open', () => {
        console.log(`Connected to dynamic database: ${db}`);

        const DynamicModel = dynamicDbConnection.model('DynamicModel', new mongoose.Schema({
        }));

        DynamicModel.find({}, (err, data) => {
            if (err) {
                console.error(`Error fetching data from dynamic database ${db}: ${err}`);
                res.status(500).json({ error: `Error fetching data from dynamic database ${db}` });
            } else {
                res.status(200).json(data);
            }
            dynamicDbConnection.close();
        });
    });
});



app.listen(8081, () => {
    console.log("server started");
});