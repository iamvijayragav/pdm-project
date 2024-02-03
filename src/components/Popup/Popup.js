import { React, useEffect, useState } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';

const PopUp = ({ setCategory, WholeData, dataBasename, trigger, setTrigger }) => {

    const InitialYesItems = WholeData.filter(item =>
        item[`${setCategory}_Deliverable_Requirement`] === 'Yes'
    );
    const InitialNoItems = WholeData.filter(item =>
        item[`${setCategory}_Deliverable_Requirement`] === 'No'
    );
    const [ListYesItems, setListYesItems] = useState(InitialYesItems);
    const [ListNoItems, setListNoItems] = useState(InitialNoItems);
    const [ModifiedToNo, setModifiedToNo] = useState({ items: [], stakeHolders: [] });
    const [MailList, setMailList] = useState();
    const access = 'write';

    const fieldsToGetApprove = [
        'Engineering',
        'Construction',
        'Commissioning',
        'Quality',
        'Regulatory_Compliance',
    ];





    const handleInputChange = (events) => {
        const { event, index, item, sdrlCode } = events;
        const SelectedValue = event.target.value;

        const GetApproval = (item) => {
            const Result = fieldsToGetApprove.filter((field) => item[field] === 'A');
            return Result;
        }

        if (item[`${setCategory}_Deliverable_Requirement`] === "Yes" &&
            SelectedValue === "No") {

            if (GetApproval(item).length === 0) {
                alert("You Response was changed !");
                setListNoItems((prevItem) => [
                    ...prevItem,
                    item,
                ])
                const FilteredYes = ListYesItems.filter(existingItem => existingItem['New_SDRL_Code'] !== item['New_SDRL_Code'])
                setListYesItems(FilteredYes);
            } else {
                alert("You have to get the approval from", GetApproval(item));
                setModifiedToNo((prevItem) => ({
                    ...prevItem,
                    items: [...prevItem.items, item],
                    stakeHolders: [...prevItem.stakeHolders, GetApproval(item)],
                }));
            }

        }
        else if (item[`${setCategory}_Deliverable_Requirement`] === "If Applicable" &&
            SelectedValue === "No") {
            setListNoItems((prevItem) => [...prevItem, item]);
        }
        else {
            if (item[`${setCategory}_Deliverable_Requirement`] === "No" && SelectedValue === "Yes") {
                const FilteredNo = ListNoItems.filter((existingItem) => existingItem['New_SDRL_Code'] !== item['New_SDRL_Code'])
                setListNoItems(FilteredNo);
            }
            setListYesItems((prevItem) => [
                ...prevItem,
                item,
            ])
        }
    }

    const FetchStakeEmail = async () => {
        try {
            const Mail = await axios.get("http://localhost:8081/api/fetch-stake-mail");
            setMailList(Mail.data);
            return Mail.data;
        } catch (err) {
            console.error("error in fetching stakeholder mail:", err);
        }
    }
    FetchStakeEmail();

    const handleSubmit = () => {


        // todo this is sample data we need to change once 
        //* change the MailToSend name to ModifiedToNo
        const MailToSend = {
            "items": [
                {
                    "_id": "64c13735cb0b2fd1275ec15e",
                    "New_SDRL_Code": "A01",
                    "TSA_Deliverable_Requirement": "Yes",
                    "TSA_Submit_with_Bid": "X",
                    "TSA_Submit_for_Review_Approval": "2 WAPO",
                    "TSA_IFI": "-",
                    "TSA_As_Built": "-",
                    "TSA_Final_Data_Submission": "2 WBD",
                    "TSA_Document_Chain": "IFR",
                    "TSA_DFO": "-",
                    "TSA_IFS_DMS": "-",
                    "TSA_IFS_CMMS": "-",
                    "TSA_AVEVA_NET": "-",
                    "Status": "Active",
                    "Final_Book": "Final Documentation",
                    "Document_Category": "Documents and 1D Engineering Registers",
                    "Document_Type_Description": "Lists/ Registers, list of certificates",
                    "Document_Description": "Supplier Master Document Register (SMDR)",
                    "LCI_Requirement_Reference": "5.39",
                    "SDRL_Reference": "A01",
                    "Project_Code": "",
                    "OrIginator_Code": "Note 2",
                    "System_Code": "0",
                    "Discipline": "A",
                    "Document_Type": "LA",
                    "Sequence_Number": "Note 5",
                    "Prefix": "SMDR-",
                    "Meaningful_title_for_Document": "Supplier Master Document Register",
                    "Module_Area_Location": "(Vendor/Contractor can Propose)",
                    "Definition_of_Quantity": "CON",
                    "Accepted_Format": "Converted File -\nPDF / Native File - EXCEL",
                    "Engineering": "A",
                    "Construction": "N",
                    "Commissioning": "N",
                    "Quality": "N",
                    "Regulatory_Compliance": "N",
                    "Information_Data_Management": "A",
                    "Life_Cycle_Information_LCI": "N",
                    "ALM": "N",
                    "Pre_Ops_Operation": "N"
                },
                {
                    "_id": "64c13735cb0b2fd1275ec161",
                    "New_SDRL_Code": "P01",
                    "TSA_Deliverable_Requirement": "Yes",
                    "TSA_Submit_with_Bid": "-",
                    "TSA_Submit_for_Review_Approval": "2 WBHZ",
                    "TSA_IFI": "-",
                    "TSA_As_Built": "-",
                    "TSA_Final_Data_Submission": "-",
                    "TSA_Document_Chain": "IFR-IFC-IAB",
                    "TSA_DFO": "-",
                    "TSA_IFS_DMS": "-",
                    "TSA_IFS_CMMS": "-",
                    "TSA_AVEVA_NET": "-",
                    "Status": "Active",
                    "Final_Book": "Final Documentation",
                    "Document_Category": "Documents and 1D Engineering Registers",
                    "Document_Type_Description": "Analysis, test and calculations",
                    "Document_Description": "Utility Demand Calculation (Change to Process)\n1) Nitrogen\n2) Instrument Air\n3) Potable Water\n4) Sea Water\n5) Fire Water",
                    "LCI_Requirement_Reference": "TBD",
                    "SDRL_Reference": "TBD",
                    "Project_Code": "",
                    "OrIginator_Code": "Note 2",
                    "System_Code": "Note 3",
                    "Discipline": "P",
                    "Document_Type": "CA",
                    "Sequence_Number": "Note 5",
                    "Prefix": "-",
                    "Meaningful_title_for_Document": "(Vendor/Contractor can Propose)",
                    "Module_Area_Location": "(Vendor/Contractor can Propose)",
                    "Definition_of_Quantity": "CON",
                    "Accepted_Format": "Converted File -\nPDF / Native File - EXCEL",
                    "Engineering": "A",
                    "Construction": "N",
                    "Commissioning": "N",
                    "Quality": "N",
                    "Regulatory_Compliance": "N",
                    "Information_Data_Management": "A",
                    "Life_Cycle_Information_LCI": "N",
                    "ALM": "N",
                    "Pre_Ops_Operation": "A"
                },
                {
                    "_id": "64c13735cb0b2fd1275ec173",
                    "New_SDRL_Code": "F03",
                    "TSA_Deliverable_Requirement": "Yes",
                    "TSA_Submit_with_Bid": "-",
                    "TSA_Submit_for_Review_Approval": "2 WAPO",
                    "TSA_IFI": "-",
                    "TSA_As_Built": "-",
                    "TSA_Final_Data_Submission": "-",
                    "TSA_Document_Chain": "IFR-IFC",
                    "TSA_DFO": "-",
                    "TSA_IFS_DMS": "-",
                    "TSA_IFS_CMMS": "-",
                    "TSA_AVEVA_NET": "-",
                    "Status": "Active",
                    "Final_Book": "To be decided",
                    "Document_Category": "Documents and 1D Engineering Registers",
                    "Document_Type_Description": "Project Management and Control Documents",
                    "Document_Description": "Project Execution Plan",
                    "LCI_Requirement_Reference": "TBD",
                    "SDRL_Reference": "A02",
                    "Project_Code": "",
                    "OrIginator_Code": "Note 2",
                    "System_Code": "0",
                    "Discipline": "F",
                    "Document_Type": "TA",
                    "Sequence_Number": "Note 5",
                    "Prefix": "-",
                    "Meaningful_title_for_Document": "(Vendor/Contractor can Propose)",
                    "Module_Area_Location": "(Vendor/Contractor can Propose)",
                    "Definition_of_Quantity": "CON",
                    "Accepted_Format": "Converted File -\nPDF / Native File - WORD",
                    "Engineering": "A",
                    "Construction": "A",
                    "Commissioning": "N",
                    "Quality": "A",
                    "Regulatory_Compliance": "N",
                    "Information_Data_Management": "N",
                    "Life_Cycle_Information_LCI": "N",
                    "ALM": "N",
                    "Pre_Ops_Operation": "N"
                }
            ],
            "stakeHolders": [
                [
                    "Engineering"
                ],
                [
                    "Engineering"
                ],
                [
                    "Engineering",
                    "Construction",
                    "Quality"
                ]
            ]
        }

        const filteredData = {}
        for (let index = 0; index < MailToSend.items.length; index++) {
            for (let j = 0; j < MailToSend.stakeHolders[index].length; j++) {
                const stakeholderCategory = MailToSend.stakeHolders[index][j];
                if (!filteredData[stakeholderCategory]) {
                    filteredData[stakeholderCategory] = [];
                }
                filteredData[stakeholderCategory].push(MailToSend.items[index]);
            }
        }

        for (let index = 0; index < MailList.length; index++) {
            const Category = MailList[index].category;

            for (const itemKey in filteredData) {
                if (itemKey === Category) {
                    const Email = MailList[index].email;
                    const Data = filteredData[itemKey];
                    const message = {
                        text: `Item Details:\n${JSON.stringify(Data, null, 2)}`,
                        to: Email,
                        subject: 'Checking Email',
                    }

                    emailjs.send('service_25082001', 'template_25082001', message, 'zNq2jzVJwaNAwPCTI')
                        .then((result) => {
                            console.log(result.text);
                        }, (error) => {
                            console.log(error.text);
                        });
                }
            }
        }


        console.log("filter", MailList);


        // console.log("final", filteredData);
        // console.log("list yes", ListYesItems);
        // console.log("list No", ListNoItems);
        // console.log("list Modified to no", ModifiedToNo);
    };

    // console.log(CombinedData,"atdadad");
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>{"SDRL Code"}</th>
                                <th>{"Document Description"}</th>
                                <th>{"LCI Requirement-Reference"}</th>
                                <th>{"Project Code"}</th>
                                <th>{"Originator Code"}</th>
                                <th>{"System Code"}</th>
                                <th>{"Discipline"}</th>
                                <th>{"Sequence Number"}</th>
                                <th>{"Definition of Quantity"}</th>
                                <th>{"Accepted Format"}</th>
                                <th>{"Engineering"}</th>
                                <th>{"Construction"}</th>
                                <th>{"Commissioning"}</th>
                                <th>{"Quality"}</th>
                                <th>{"Sequence Number"}</th>
                                <th>{"Regulatory Compliance"}</th>
                                <th>{"LCI"}</th>
                                <th>{"ALM"}</th>
                                <th>{"Pre Ops"}</th>
                                <th>{"Deliverable Requirement"}</th>
                                <th>{"Submit with Bid"}</th>
                                <th>{"Submit for Review Approitem"}</th>
                                <th>{"IFI"}</th>
                                <th>{"As Built"}</th>
                                <th>{"Final Data Submission"}</th>
                                <th>{"Document Chain"}</th>
                                <th>{"DFO"}</th>
                                <th>{"IFS DMS"}</th>
                                <th>{"IFS CMMS"}</th>
                                <th>{"AVEVA NET"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {WholeData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item['New_SDRL_Code']}</td>
                                        <td>{item['Document_Description']}</td>
                                        <td>{item['LCI_Requirement_Reference']}</td>
                                        <td>{item['Project_Code']}</td>
                                        <td>{item['OrIginator_Code']}</td>
                                        <td>{item['System_Code']}</td>
                                        <td>{item['Discipline']}</td>
                                        <td>{item['Sequence_Number']}</td>
                                        <td>{item['Definition_of_Quantity']}</td>
                                        <td>{item['Accepted_Format']}</td>
                                        <td>{item['Engineering']}</td>
                                        <td>{item['Construction']}</td>
                                        <td>{item['Commissioning']}</td>
                                        <td>{item['Quality']}</td>
                                        <td>{item['Sequence_Number']}</td>
                                        <td>{item['Regulatory_Compliance']}</td>
                                        <td>{item['Life_Cycle_Information_LCI']}</td>
                                        <td>{item['ALM']}</td>
                                        <td>{item['Pre_Ops_Operation']}</td>
                                        <td>
                                            {access === 'write' ? (
                                                <select
                                                    id={item['New_SDRL_Code']}
                                                    onChange={(event) =>
                                                        handleInputChange({
                                                            event,
                                                            index,
                                                            item,
                                                            sdrlCode: item['New_SDRL_Code'],
                                                        })
                                                    }
                                                    defaultValue={item[`${setCategory}_Deliverable_Requirement`]}
                                                >
                                                    <option value={"No"}>No</option>
                                                    <option value={"Yes"}>Yes</option>
                                                    <option value={"If Applicable"}>If Applicable</option>
                                                </select>
                                            ) : (
                                                <div>{item[`${setCategory}_Deliverable_Requirement`]}</div>
                                            )}
                                        </td>
                                        <td>{item[`${setCategory}_Submit_with_Bid`]}</td>
                                        <td>{item[`${setCategory}_Submit_for_Review_Approitem`]}</td>
                                        <td>{item[`${setCategory}_IFI`]}</td>
                                        <td>{item[`${setCategory}_As_Built`]}</td>
                                        <td>{item[`${setCategory}_Final_Data_Submission`]}</td>
                                        <td>{item[`${setCategory}_Document_Chain`]}</td>
                                        <td>{item[`${setCategory}_DFO`]}</td>
                                        <td>{item[`${setCategory}_IFS_DMS`]}</td>
                                        <td>{item[`${setCategory}_IFS_CMMS`]}</td>
                                        <td>{item[`${setCategory}_AVEVA_NET`]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            <button className="close-btn" onClick={() => setTrigger(false)}>Close</button>
        </div>
    ) : "";
}

export default PopUp;