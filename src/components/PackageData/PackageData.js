import { useState } from "react";
import Popup from '../Popup/Popup';

const PackageData = ({ dataBasename }) => {
    const BackendUrl = 'http://localhost:8081'; 
    const [newProjectCode, setNewProjectCode] = useState('');
    const CATEGORY = [
        {
            "id": 1, "option": "Topside Contractor - Category TSA", "shortcat": "TSA",
        }, {
            "id": 2, "option": "Topside Contractor - Category TSB", "shortcat": "TSB",
        }, {
            "id": 3, "option": "Topside Contractor - Category TSC", "shortcat": "TSC",
        }, {
            "id": 4, "option": "Topside Contractor - Category TSD", "shortcat": "TSD",
        }, {
            "id": 5, "option": "Topside Contractor - Category MNA", "shortcat": "MNA",
        }, {
            "id": 6, "option": "Marine Package Vendors - Category MNB", "shortcat": "MNB",
        }, {
            "id": 7, "option": "Marine Package Vendors - Category MNC", "shortcat": "MNC",
        }, {
            "id": 8, "option": "Marine Package Vendors - Category MND", "shortcat": "MND",
        }, {
            "id": 9, "option": "Marine Package Vendors - Category MNE", "shortcat": "MNE",
        }, {
            "id": 10, "option": "Marine Package Vendors - Category MNF", "shortcat": "MNF",
        }, {
            "id": 11, "option": "Marine Package Vendors - Category MNG", "shortcat": "MNG",
        }, {
            "id": 12, "option": "Metering Package - Category TSF", "shortcat": "TSF",
        }, {
            "id": 13, "option": "R&LEC Shipyard - Category RSD", "shortcat": "RSD",
        }, {
            "id": 14, "option": "3rd Party Studies - Category TPS", "shortcat": "TPS",
        }, {
            "id": 15, "option": "RC Contractor- Category RCC", "shortcat": "RCC",
        }, {
            "id": 16, "option": "Topside Main Power Generation- Category TSE", "shortcat": "TSE",
        },
    ];
    const [choosedCategory, setChoosedCategory] = useState('TSA');
    const [inputs, setInputs] = useState({ 'prjcat': 'Topside Contractor - Category TSA' });
    const [btnPopUp, setBtnPopUp] = useState(false);

    const db = dataBasename;
    console.log(db);
    const handleSelect = (e) => {
        for (let i = 0; i < CATEGORY.length; i++) {
            if (CATEGORY[i].option === e) {
                setChoosedCategory(CATEGORY[i].shortcat);
                setInputs(values => ({ ...values, [`cleancat`]: CATEGORY[i].shortcat }))
            }
        }
    }
    const changeHandler = (event) => {
        event.preventDefault()
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        if (name === 'projectNo') {
            setNewProjectCode(value)
        }
        if (name === 'prjcat') {
            handleSelect(value);
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault();
    }

    const handleExport = async () => {
        setBtnPopUp(true);
    }


    return (
        <div className='form-container'>
            <div className="form-group">
                <div className="package-data">
                    <form action="" onSubmit={submitHandler}>
                        <label>Project Number
                            <input type="text" className='form-input' name='projectNo' value={newProjectCode} onChange={changeHandler} />
                        </label><br />
                        <label >Project Category
                            <select className="form-input" name="prjcat" id="input-field-select" onChange={changeHandler}>
                                {CATEGORY.map((val) => <option key={val.id} defaultValue={val.option}>{val.option}</option>)}
                            </select></label>
                        <br />
                        <label>Package Clean category
                            <input className="form-input" name="cleancat" value={choosedCategory} /></label><br />
                        <label>Package Title
                            <input type="text" id="input-field" className="form-input" name="pactitle" onChange={changeHandler} value={inputs.pactitle || ""} /></label><br />
                        <label>RFQ Number
                            <input type="text" id="input-field" className="form-input" name="rfqno" onChange={changeHandler} value={inputs.rfqno || ""} /></label><br />
                        <label >Document Number
                            <input type="text" id="input-field" className="form-input" name="docno" onChange={changeHandler} value={inputs.docno || ""} /></label><br />
                        <label>Sequence
                            <input type="text" id="input-field" className="form-input" name="sequence" onChange={changeHandler} value={inputs.sequence || ""} /></label><br />
                        <label>System
                            <input type="text" id="input-field" className="form-input" name="system" onChange={changeHandler} value={inputs.system || ""} /></label><br />
                        <label>Document Title
                            <input type="text" id="input-field" className="form-input" name="doctitle" onChange={changeHandler} value={inputs.doctitle || ""} /></label><br />
                        <button type="Submit" className='form-btn' value="Export" onClick={handleExport}>Export</button>
                        {
                            (btnPopUp) && (
                                <Popup trigger={btnPopUp} setTrigger={setBtnPopUp} setCategory={choosedCategory}></Popup>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
export default PackageData;