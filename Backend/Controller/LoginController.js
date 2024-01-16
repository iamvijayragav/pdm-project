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


exports.FetchUser = async (req, res) => {
    try {
        const Project = await AddProject.find({});
        res.status(200).json(Project);
    } catch (err) {
        console.log("Error in Fetching Projects", err);
        res.status(500).json({ error: "Error in Fetching Projects." })
    }
}