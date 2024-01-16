const mongoose=require("mongoose");
const Projects=new mongoose.Schema(
    {
        project_name:String,
        project_code:String,
        database:String,
    },
    {
        collection:"ProjectCollection",
    }
);
const AddProject = mongoose.model("ProjectCollection",Projects);
module.exports = AddProject;