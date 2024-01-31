const mongoose=require("mongoose");
const Projects=new mongoose.Schema(
    {
        project_name: { type: String, required: true },
        project_code:{ type: String, required: true },
        database:String,
    },
    {
        collection:"ProjectCollection",
    }
);
const AddProject = mongoose.model("ProjectCollection",Projects);
module.exports = AddProject;