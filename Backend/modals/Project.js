const mongoose = require('mongoose');

const Project = new mongoose.Schema({
    project_code: String,
    user_id: String,
    access:String,
})


const ModalProject = mongoose.model('ProjectAccess',Project, 'ProjectAccess');
module.exports = ModalProject;
