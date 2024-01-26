const mongoose = require("mongoose");
const CreateModel = (Schema, ConnectionObj, Name) => {
    if (ConnectionObj) {
        return ConnectionObj.model(Name, Schema);
    }
    return mongoose.model(Name, Schema);
}
module.exports = CreateModel;