const User = require('../modals/UserInfo');
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
