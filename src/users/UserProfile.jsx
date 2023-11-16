import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import "../styles/All.css";
import { Spacer, useToast, Box, Table, Tr, Td, TableContainer, Input, Select, Button, Link, Flex, Avatar, Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import axios from 'axios';  
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

const UserProfile = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isModalOpen, setIsModalOpen] = useState(false);

    //checking have acces token or not and save to the state
    const [isLogged, setIsLogged] = useState(localStorage.getItem('access_token'));
    const [dataDiri, setDataDiri] = useState({});
    const [avatar, setAvatar] = useState();
    const [avatarUpdate, setAvatarUpdate] = useState();
    const [id, setId] = useState(null);
    const [cv, setCv] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();

    // console.log(isLogged)

    //mount if page is open

    useEffect(() => {
        //fetching with axios 
        if (isLogged) {
            // console.log(accessToken);
            axios.get(`https://50cglb1j-4000.asse.devtunnels.ms/user/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .then((response) => {
                //get data and set the state
                setDataDiri(response.data);
                //set id 
                setId(response.data.data.id);
                //console.log(response.data);
            })
            .catch((error) => {
                console.error('Terjadi kesalahan dalam permintaan HTTP:', error);
            });
            }
            handleAvatar();
            handleCv();
    }, []);

    //function for get avatar

    const handleAvatar = async() => {
        
        if (isLogged) {
            await axios.get("https://50cglb1j-4000.asse.devtunnels.ms/user/avatar", {
                responseType: 'blob', //to set blob response 
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .then((response) => {
                const blobURL = URL.createObjectURL(response.data);
                setAvatar(blobURL);
                // console.log(response.data)
            })
            .catch((error) => {
                console.error('Terjadi kesalahan dalam permintaan HTTP:', error);
            });
        }
    };

    //function for post avatar 

    const handleAvatarUpload = async(e) => {

        e.preventDefault();

        if (!avatarUpdate) {
            return; // No file selected, so we don't need to upload anything
        }

       const formData = new FormData();
       formData.append('avatar', avatarUpdate);

        try {
            await axios.post("https://50cglb1j-4000.asse.devtunnels.ms/user/avatar",  formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });

        toast({
            title: 'Updated Profile Succes',
            description: 'Refresh your page.!',
            status: "success",
            duration: 2000,
            isClosable: true,
            position: 'top'
        });

        } catch (error) {
            console.log(error);
        };
    };

    // get cv functions fetch

    const handleCv = async() => {
        
        if (isLogged) {
            try{
                await axios.get("https://50cglb1j-4000.asse.devtunnels.ms/user/cv", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                .then((response) => {
                    setCv(response.data.cv);
                    // console.log(response.data.cv);
                    // console.log(url);
                })
            }
            catch(error) {
                console.error('Terjadi kesalahan dalam permintaan HTTP:', error);
            }
        }
    };

    // functions post cv 

    const handleCvUpload = async(e) => {

        e.preventDefault();

        if (!cv) {
            return; // No file selected, so we don't need to upload anything
        }

       const formData = new FormData();
       formData.append('cv', cv);

        try {
            await axios.post("https://50cglb1j-4000.asse.devtunnels.ms/user/cv",  formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        } catch (error) {
            console.log(error);
        };
    };

    //function for handle update dataDiri

    const handleUpdate = async(e) => {
        e.preventDefault();

        //get id 
        if (id === null) {
            console.error("Id is not defind");
            return;
        }

        //get data from input field value 
        const updatedData = {
            name: e.target.name.value,
            email: e.target.email.value,
            address: e.target.address.value,
            contact: e.target.contact.value,
            gender: e.target.gender.value,
        };
        
        //post data to api 
        try {
            await axios.put(`https://50cglb1j-4000.asse.devtunnels.ms/user/profile/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            // toast display if data updated 

            toast({
                title: 'Updated data Succes',
                description: 'Refresh your page.!',
                status: "success",
                duration: 2000,
                isClosable: true,
                position: 'top'
            });

            navigate("/userHome/Profile");

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
        <Navbar/>
            <Box height='110vh' bgSize="cover" bgColor="#111215">
                <Box paddingTop="6%">
                    <Flex justifyContent='flex-start' gap={20}>
                        <Avatar className="avatar-container-big" marginLeft='80px' width='250px' height='250px' size='2xl' name={dataDiri.data && dataDiri.data.name} src={avatar} onClick={() => setIsModalOpen(true)}></Avatar>
                            <form onSubmit={(e) => {e.preventDefault();handleUpdate(e);handleAvatarUpload(e);handleCvUpload(e);}}>
                                <TableContainer width={"600px"}>
                                    <Table variant="simple" color="white">
                                        <Tr>
                                            <Td>Name</Td>
                                            <Td>:</Td>
                                            <Td>
                                                <Input isRequired='true' name="name" defaultValue={dataDiri.data && dataDiri.data.name}></Input>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Email</Td>
                                            <Td>:</Td>
                                            <Td>
                                                <Input isRequired='true' name="email" defaultValue={dataDiri.data && dataDiri.data.email}></Input>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Address</Td>
                                            <Td>:</Td>
                                            <Td><Input isRequired='true' name="address" defaultValue={dataDiri.data && dataDiri.data.address}></Input></Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Contact</Td>
                                            <Td>:</Td>
                                            <Td><Input isRequired='true' name="contact" type="number" inputMode="numeric" defaultValue={dataDiri.data && dataDiri.data.contact}></Input></Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Gender</Td>
                                            <Td>:</Td>
                                            <Td>
                                                <Select isRequired='true' name="gender" type="text" defaultValue={dataDiri.data && dataDiri.data.gender} placeholder={`${dataDiri.data && dataDiri.data.gender}`} color={"white"} textColor="#D9D9D9" backgroundColor={""}>
                                                    <option value='Male' >Male</option>
                                                    <option value='Female'>Female</option>
                                                </Select>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Profile Picture</Td>
                                            <Td>:</Td>
                                            <Td>
                                                <Input name="avatar" paddingTop='1.5' type="file" accept="image/*" onChange={(e) => setAvatarUpdate(e.target.files[0])}></Input>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Curiculum Vitae</Td>
                                            <Td>:</Td>
                                            <Td>
                                                <Input name="cv" paddingTop='1.5' type="file" accept=".pdf" onChange={(e) => setCv(e.target.files[0])}></Input>
                                                <br/>
                                                <Link paddingTop='10px' href={cv} target="_blank"> *Lihat CV Anda</Link>    
                                            </Td>
                                        </Tr>
                                    </Table>
                                    <Button marginTop='7' type="submit">
                                        Save
                                    </Button>
                                </TableContainer>
                        </form>
                    </Flex>
               </Box>
               <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Edit Profile</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <form onSubmit={(e) => {e.preventDefault();handleAvatarUpload(e);setIsModalOpen(false);}}>
                                <Input paddingTop='1.5' name="avatar" type="file" accept="image/*" onChange={(e) => setAvatarUpdate(e.target.files[0])}></Input>
                                <Button type="submit" marginTop={"20px"} bgColor={"#D9D9D9"}> Save </Button>
                            </form>
                        </ModalBody>
                        </ModalContent>
                </Modal>
            </Box>
        <Footer/>
        </>
    )
}

export default UserProfile;