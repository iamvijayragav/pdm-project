const User = require('../modals/UserInfo');
const AddProject = require('../modals/AddProject');
exports.login = async (req, res) => {
    
    const { email, password } = req.body;    
    try {
        const oldUser = await User.findOne({ email });
        if (password && password === oldUser.password) {
            //todo hashing
            return res.json(oldUser).status(200);
        }
        else {
            res.send({status:"Invalid Credentials"}).status(408)
        }
    } catch (error) {
        console.log(error);
        res.send({ status: "Error in Login" }).status(409)
    }
}


exports.FetchProject = async (req, res) => {
    try {
        const Project = await AddProject.find({});
        res.status(200).json(Project);
    } catch (err) {
        console.log("Error in Fetching Projects", err);
        res.status(500).json({ error: "Error in Fetching Projects." })
    }
}


exports.FetchUser =  async (req, res) => {
    try {
        const Project = await User.find({});
        res.status(200).json(Project);
    } catch (err) {
        console.log("Error in Fetching Users", err);
        res.status(500).json({ error: "Error in Fetching Users." })
    }
}

exports.AddingProject = async (req, res) => {

    const { projectCode, projectName } = req.body;
    const dataBase = projectCode + '_' + projectName;
    
    try {
        const newProject = new AddProject({
            project_code: projectCode,
            project_name: projectName,
            database: dataBase,
        })
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);

    } catch (err) {
        console.error("Error Adding Projects: ", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}

exports.AddUser = async (req, res) => {
    const {
        name,
        user_id,
        email,
        password,
        company_name,
        role,
    } = req.body;
    console.log(req.body);
    try {
        const filter = { $or: [{ email: email }, { user_id: user_id }] };
        const update = {
            name,
            user_id,
            email,
            password,
            company_name,
            role,
        };
        const options = { upsert: true, new: true };
        const updatedUser = await User.findOneAndUpdate(filter, update, options);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error Adding Users: ", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}