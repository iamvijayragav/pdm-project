import { React, useEffect, useState } from "react";
import axios from "axios";

const PopUp = (props) => {

    const ChosenCategory = props.setCategory;
    const dataBasename = props.dataBasename;
    const CombinedData = props.WholeData;
    
    // const [CombinedData, setCombinedData] = useState();
    console.log(dataBasename, ChosenCategory);

    const [updatedValues, setUpdatedValues] = useState({
        sdrl_stakeholders_list: [],
    });

    const [exactValue, setExactValue] = useState({
        exact_stakeholders_list: [],
    });

    const access = 'write';

    const fieldsToCheck = [
        'Engineering',
        'Construction',
        'Commissioning',
        'Quality',
        'Regulatory_Compliance',
    ];


    const FetchData = async () => {
        try {
            const data = await axios.post(`http://localhost:8081/api/dynamic-category/${ChosenCategory}/${dataBasename}`);
            console.log(data.data);
           
        } catch (err) {
            console.error("Error in fetching DataBase Content");
        }
    }

    useEffect(() => {
        // FetchData();
    }, [])

    //* ========================================To get index of the dropdown modified location============================>
    const handleInputChange = (events) => {
        const { target } = events.event;
        const { item } = events; //events.item
        const sdrlCode = item['New_SDRL_Code'];
        const list = fieldsToCheck.filter((field) => item[field] === 'A');
        const selectedValue = target.value;

        if (
            item[`${ChosenCategory}_Deliverable_Requirement`] === "Yes" &&
            selectedValue === "No"
        ) {
            setUpdatedValues((prev) => ({
                sdrl_stakeholders_list: [
                    ...prev.sdrl_stakeholders_list,
                    {
                        'sdrlcode': sdrlCode,
                        'stake_holders': list,
                    },
                ],
            }))
            alert("You are unauthorized to change from 'No' to 'Yes'.");
        }

        // * Create a new array containing only "Yes"
        const newArrayOfYes = exactValue.exact_stakeholders_list.filter(
            (entry) => entry.changed_value === "Yes"
        );


        setExactValue((prev) => ({
            exact_stakeholders_list: [
                ...prev.exact_stakeholders_list,
                {
                    'stake_holders': list,
                    'items_value': item,
                    'changed_value': selectedValue,
                },
            ],
        }));
    };

    //* =====================>xxxxxxxxxxxxxxxxxxxxxxxx<================

    const handleSubmit = () => {

    };

    console.log(CombinedData,"atdadad");
    return (props.trigger) ? (
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
                            {CombinedData.map((item, index) => {
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
                                                    defaultValue={item[`${ChosenCategory}_Deliverable_Requirement`]}
                                                >
                                                    <option value={"No"}>No</option>
                                                    <option value={"Yes"}>Yes</option>
                                                    <option value={"If Applicable"}>If Applicable</option>
                                                </select>
                                            ) : (
                                                <div>{item[`${ChosenCategory}_Deliverable_Requirement`]}</div>
                                            )}
                                        </td>
                                        <td>{item[`${ChosenCategory}_Submit_with_Bid`]}</td>
                                        <td>{item[`${ChosenCategory}_Submit_for_Review_Approitem`]}</td>
                                        <td>{item[`${ChosenCategory}_IFI`]}</td>
                                        <td>{item[`${ChosenCategory}_As_Built`]}</td>
                                        <td>{item[`${ChosenCategory}_Final_Data_Submission`]}</td>
                                        <td>{item[`${ChosenCategory}_Document_Chain`]}</td>
                                        <td>{item[`${ChosenCategory}_DFO`]}</td>
                                        <td>{item[`${ChosenCategory}_IFS_DMS`]}</td>
                                        <td>{item[`${ChosenCategory}_IFS_CMMS`]}</td>
                                        <td>{item[`${ChosenCategory}_AVEVA_NET`]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
    ) : "";
}

export default PopUp;