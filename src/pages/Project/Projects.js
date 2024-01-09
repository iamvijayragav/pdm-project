import { React, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Projects = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isValidUser, setIsValidUser] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchApi() {
            const email = localStorage.getItem('email')
            const _id = localStorage.getItem('_id')
            setIsLoading(true);
            
            await axios.post('http://localhost:8081/verify', { email, _id, currRole:"project"})
                .then(
                    res => {
                        console.log(res)
                        if (res && res.data.validUser) {
                            setIsValidUser(true)
                        } else {
                            navigate('/')
                        }
                    }
                ).catch(err => {
                    console.log(err)
                    setIsValidUser(false);
                    setIsLoading(false);
                    navigate('/')
                })
        };
        fetchApi();
    },[]);

    
    return (
        <div>
            {isValidUser && <div>
                <Sidebar />
            </div>
            }
        </div>
    );

}

export default Projects;