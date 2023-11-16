import React from "react";
import {FormControl, Table, Tr, Td, Box, Link, Text, Stack, Img, Center, Card, CardHeader, Input, InputGroup, InputRightAddon, Button, useToast, Select } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const RegisterVerify = () => {

    //State of Data

    const [address, setAddress] = useState('');
    const [contact, setContact  ] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState();
    const [cv, setCv] = useState();

    const toast = useToast();
    const { token } = useParams();
    const navigate = useNavigate();

    // If Token is not defind
    if (!token) {
        navigate("/auth/verify/notfound");
    }

    const handleCreateComplete = async(e) => {
        e.preventDefault();

        // checking data must not null
        // ALert if data null

        if (!address || !contact || !gender) {
            toast({
                title: 'Check Your Form',
                description: 'Please input all your data',
                status: 'warning',
                duration: 3500,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        // post data to api 
        try {
            await axios.post(`https://50cglb1j-4000.asse.devtunnels.ms/auth/verify/${token}`, {
                address: address,
                contact: contact,
                gender: gender,
            });

            toast({
                title: 'Complete data Succes',
                description: 'Please go to login',
                status: "success",
                duration: 4000,
                isClosable: true,
                position: 'top'
            });

            navigate("/login");

        } catch (error) {
           console.log(error);
        }
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleCvChange = (e) => {
        setCv(e.target.files[0]);
    };

    return (
        <>
        <Box className="register-verify">
            <Box paddingLeft="70px" color="white" paddingTop="20px">
                <Link href="/">
                    <Img src={logo} alt="SocMedia" width="173px" height="47px" borderRadius="5px"></Img>
                </Link>    
            </Box>
            <Center paddingTop={"70px"} display="flex" flexDirection="row" justifyContent="flex-end" paddingRight="100px" marginTop="-2%">
                <Card bgColor="transparent" align="center" className="registerCard" variant="unstyled" paddingBottom="20px" borderRadius="30px">
                    <CardHeader>
                        <Center>
                            <Img src={user} alt="user" width="108px" height="108px"></Img>
                        </Center>
                        <br/>
                        <Center textColor="white" >
                            <Text fontSize="2xl" fontWeight="bold" paddingBottom="10px">
                                Complete Your Data 
                            </Text>
                        </Center>
                    </CardHeader>
                        {/* <Text textAlign="center"></Text> set msg */}
                    <form onSubmit={handleCreateComplete}>
                        <Table spacing={4} variant="unstyled" alignItems="center">
                            <Tr>
                                <Td>
                                    <Input isRequired value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" type="text" textAlign="left" borderRadius="10px" textColor="#D9D9D9" width="284px"></Input>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Input isRequired value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone Number" type="tel" inputMode="numeric" textAlign="left" borderRadius="10px" textColor="#D9D9D9" width="284px"></Input>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Select isRequired value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" type="text" textColor="#D9D9D9" textAlign="left" borderRadius="10px" width="284px">
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Select>
                                </Td>
                            </Tr>
                            {/* <Tr>
                                <Td>
                                    <Text textColor="white" paddingTop="-2">*Profile Image Requirements</Text>
                                    <Input isRequired onChange={handleAvatarChange} type="file" accept="image/*" textAlign="left" textColor="#D9D9D9" borderRadius="10px" width="284px" height="40px" paddingTop="1.5"></Input>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                <Text textColor="white" paddingTop="-2">*Cv Requirements</Text>
                                    <Input isRequired onChange={handleCvChange} type="file" accept=".pdf" textAlign="left" textColor="#D9D9D9" borderRadius="10px" width="284px" height="40px" paddingTop="1.5"></Input>
                                </Td>
                            </Tr> */}
                            <Box textAlign="center" paddingTop="2">
                                <Button borderRadius="10px" bgColor="none" type="submit">Complete Your Account</Button>
                            </Box>
                        </Table>
                    </form>
                    <br/>
                        <Box paddingLeft="20px" paddingRight="20px" textAlign="center"> 
                            <Text textColor="white" textAlign="center">
                                Best Regards, SOCJOBS
                            </Text>
                        </Box>
                        <br/>
                </Card>
            </Center>
        </Box>
        </>
    );
};

export default RegisterVerify;