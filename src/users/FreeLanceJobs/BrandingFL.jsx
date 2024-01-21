import Navbar  from "../../components/Navbar";
import React, { useEffect, useState, useRef } from "react";
import Footer  from "../../components/Footer";
import { Box, Center, Heading, Text, Button, Select, useToast } from "@chakra-ui/react";
import "../../styles/All.css";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react';
  import { useDisclosure } from "@chakra-ui/react";

const BrandingFL = () => { 

    const [jobs, setJobs] = useState([]);
    const [experience, setExperience] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; 
    const toast = useToast();

    console.log(jobs);

    //apply jobs
    const [id,setId] = useState(null);
    const [job_id,setJob_Id] = useState(null);

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

    //get acces token from localstorage
    const accessToken = localStorage.getItem('access_token');

    const handleFetch = () =>{

        //conditional if have acces token on localstorage

        if (accessToken) {
        //conditional for get api because the choose option 
        const apiURL = experience ? `https://7s81h0b9-4000.asse.devtunnels.ms/job/filter?jobType=2&position=3&experience=${experience}` :
                                    `https://7s81h0b9-4000.asse.devtunnels.ms/job/filter?jobType=2&position=3`;

        // menambahkan token ke header dan fetch data
        axios.get(apiURL, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            // setJobs(response.data.data.rows);
            // console.log(response.data.data.rows);

            // how to not display jobs id closed
            const currentDate = new Date();
            const filteredJobs = response.data.data.rows.filter(job => {
               const closedDate = new Date(job.closedAt);
               return currentDate <= closedDate;
            });

            setJobs(filteredJobs);
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

    //get data user from acces token
    const getDataUser = () => {
        axios.get(`https://7s81h0b9-4000.asse.devtunnels.ms/user/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .then((response) => {
                //set id 
                setId(response.data.data.id);
                //console.log(response.data);
            })
            .catch((error) => {
                console.error('Terjadi kesalahan dalam permintaan HTTP:', error);
            });
        };

    //push data application
    const handleSubmit = () => {
        try {
            axios.post("https://7s81h0b9-4000.asse.devtunnels.ms/application", {
            jobId: job_id,
            userId: id
        }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
        });

        toast({
            title: 'Successful job application"', 
            description: 'Regularly check email',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top', 
        });
        } catch (error) {
            console.error('Terjadi kesalahan dalam permintaan HTTP:', error);
        }
    };

    // function handlepage for pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        // Automatically fetch data when page loads
        handleFetch();
        getDataUser();
    }, [experience, currentPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //var for mapping
    const displayedJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

    //page numbers with array 0 to push the data with loop
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(jobs.length / itemsPerPage); i++){
        pageNumbers.push(i);
    }

    //for alert if click button apply
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    
    return(
        <>
         <Navbar/>
            <Box className="fullTimeJobsType" paddingTop="5%">
                <Box marginBottom='90px' marginLeft='5%'>
                    <Text fontSize="5xl" fontWeight="bold" fontFamily="poppins" bgGradient="linear(90deg, #169FC2 -8.13%, #8D64BC 43.63%, #EE5471 104.46%)" bgClip='text'>
                        Full Time Jobs 
                    </Text>
                </Box>
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
                {displayedJobs?.length > 0 ? (
                    displayedJobs.map((job) => (
                        <Box key={job.id} bgColor="#272829" w="100%" minHeight={"85vh"} maxHeight={"200vh"} borderRadius="2xl" marginTop="-3%">   
                            <Box gap={5} display="flex" flexDirection="column" marginLeft="2%" marginTop="2%">
                                 
                            <Box textColor="white" width="50%">
                                <Heading>{job.title}</Heading>
                            </Box>
    
                            <Box textColor="white" width="50%">
                                <Text fontSize='xl' fontWeight='semibold'> {job.jobType.job_type} Jobs </Text>
                            </Box>
                            
                            <Box textColor="white" width="50%"> 
                                <Text>Dibutuhkan :</Text>
                                <Text>{job.quota} Karyawan</Text>
                            </Box>
    
                            <Box textColor="white" width="70%" minHeight={"150px"} maxHeight={"350px"}>
                                <Heading marginBottom={"10px"}>Description</Heading>
                                <Text>{job.job_desc}</Text>
                            </Box>
    
                            <Box textColor="white" width="70%" minHeight={"150px"} maxHeight={"350px"}>
                                <Heading marginBottom={"10px"}>Requirements</Heading>
                                <Text >{job.requirement}</Text>
                            </Box>
    
                            <Box marginBottom={"20px"}>
                                <Button onClick={() => {setJob_Id(job.id); onOpen();}}>Apply</Button>
                            </Box>
                            </Box>
                        </Box>
                       ))
                ) : (
                    <Box bgColor="#272829" w="100%" height="100vh" borderRadius="2xl" marginTop="-3%">
                        <Text textColor="white" textAlign={"center"} marginTop={"220px"} fontSize={"3xl"} fontWeight={"semibold"}>LOADING.... / VACANCIES ARE NOT AVAILABLE AT THIS TIME</Text>
                    </Box>
                )}

                    {/* display alert */}
                    <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
                        <AlertDialogOverlay/>

                        <AlertDialogContent>
                            <AlertDialogHeader>Apply Jobs ?</AlertDialogHeader>
                            <AlertDialogCloseButton/>

                            <AlertDialogBody>
                                Are you sure you want to apply this job ?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                                    No
                                </Button>
                                <Button colorScheme="green" ml={3} onClick={() => { handleSubmit(); onClose(); }}>
                                    Yes
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                     
                </Center>
                <Box>
                    <p className="pagination-text">Page</p>
                    <ul className="pagination">
                        {pageNumbers.map((number) => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                <a onClick={() => handlePageChange(number)} href="#">
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Box>
        <Footer/>
        </>
    );
};
export default BrandingFL;