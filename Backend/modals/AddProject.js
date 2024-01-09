const mongoose=require("mongoose");
const Projects=new mongoose.Schema(
    {
        projectname:String,
        projectcode:String,
        database:String,
    },
    {
        collection:"ProjectCollection",
    }
);
const AddProject = mongoose.model("ProjectCollection",Projects);
module.exports = AddProject;