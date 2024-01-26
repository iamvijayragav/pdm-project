const mongoose=require("mongoose");

function CategoryModal( Category ) {
    const Schema = new mongoose.Schema({
            'New_SDRL_Code': String,
            [`${Category}_Deliverable_Requirement`]: String,
            [`${Category}_Submit_with_Bid`]: String,
            [`${Category}_Submit_for_Review_Approval`]: String,
            [`${Category}_IFI`]: String,
            [`${Category}_As_Built`]: String,
            [`${Category}_Final_Data_Submission`]: String,
            [`${Category}_Document_Chain`]: String,
            [`${Category}_DFO`]: String,
            [`${Category}_IFS_DMS`]: String,
            [`${Category}_IFS_CMMS`]: String,
            [`${Category}_AVEVA_NET`]: String
        })
    
    return mongoose.model(Category, Schema);
}

module.exports = CategoryModal;