const mongoose=require("mongoose");
const StakeHolderSchema=new mongoose.Schema(
    {
        New_SDRL_Code:String,
        Engineering:String,
        Construction:String,
        Commissioning:String,
        Quality:String,
        Regulatory_Compliance:String,
        Information_Data_Management:String,
        Life_Cycle_Information_LCI:String,
        ALM:String,
        Pre_Ops_Operation:String,
},
    {
        collection:"Stake_holder",
    }
);
const StakeData = mongoose.model("Stake_holder",StakeHolderSchema);
module.exports = StakeData;
