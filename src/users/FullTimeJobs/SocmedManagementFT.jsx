import Navbar  from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import Footer  from "../../components/Footer";
import { Box, Center, Heading, Text, Button, Select } from "@chakra-ui/react";
import "../../styles/All.css";
import axios from "axios";

const SocmedManagementFT = () => { 

    const [jobs, setJobs] = useState([]);
    const [experience, setExperience] = useState('');

    // List experiences for state, option, and params 
    const experiences = [
        {
            id: 1,
            exp_desc: 'Kurang dari 1 tahun',
        },
        {
            id: 2,
            exp_desc: '1 - 3 tahun',
        },
        {
            id: 3,
            exp_desc: '4 - 5 tahun',
        },
        {
            id: 4,
            exp_desc: '6 - 10 tahun',
        },
        {
            id: 5,
            exp_desc: 'Lebih dari 10 tahun',
        },
    ];

    const handleFetch = () =>{

        //get acces token from localstorage
        const accessToken = localStorage.getItem('access_token');

        //conditional if have acces token on localstorage

        if (accessToken) {
        // menambahkan token ke header dan fetch data
        axios.get(`https://50cglb1j-4000.asse.devtunnels.ms/job/filter?jobType=1&position=1&experience=${experience}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            setJobs(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error Axios:", error);
            console.log(error.response);
        });
        } 
        
        else {
            console.error("Acces token tidak ditemukan dalam local storage");
        }
    };

    useEffect(() => {
        // Automatically fetch data when page loads
        handleFetch();
    }, [experience]);
    

    return(
        <>
        <Navbar/>
            <Box className="fullTimeJobsType" paddingTop="15%">
                <Box bgColor="#353538" padding="1.5%" marginTop="-5%" marginLeft="5%" marginRight="5%" borderRadius="2xl">
                        <Box paddingRight="80%">
                            <Select onChange={(e) => {setExperience(e.target.value); handleFetch();}} bgColor="#D9D9D9" variant="solid" placeholder="Experience" textColor="black">
                                {experiences.map((exp, index) => (
                                    <option key={index} value={exp.id}>
                                        {exp.exp_desc}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                <Center padding="5%"> 
                {jobs?.data?.jobs?.map((job, index) => (
                    <Box key={index} bgColor="#272829" w="100%" height="88vh" borderRadius="2xl">
                        <Box gap={5} display="flex" flexDirection="column" marginLeft="2%" marginTop="2%">
                             
                        <Box textColor="white" width="50%">
                            <Heading>{job.title}</Heading>
                        </Box>

                        <Box textColor="white" width="50%">
                            <Text> FullTime Jobs </Text>
                        </Box>
                        
                        <Box textColor="white" width="50%"> 
                            <Text>Dibutuhkan :</Text>
                            <Text>{job.quota} Karyawan</Text>
                        </Box>

                        <Box textColor="white" width="50%">
                            <Text>Pendaftar :</Text>
                            <Text> {job.applicant} Pendaftar</Text>
                        </Box>

                        <Box textColor="white" width="50%">
                            <Heading>Description</Heading>
                            <Text height={100}>{job.job_desc}</Text>
                        </Box>

                        <Box textColor="white" width="50%">
                            <Heading>Requirements</Heading>
                            <Text height={100}>{job.requirement}</Text>
                        </Box>

                        <Box>
                            <Button>Apply</Button>
                        </Box>
                        </Box>
                    </Box>
                    ))}
                </Center>
            </Box>
        <Footer/>
        </>
    );
};

export default SocmedManagementFT;