import React from "react";
import { Box, useToast, Link, Img, Heading, Flex, Text, Input, Button, Center, InputGroup, InputRightAddon } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ForgotPassword = () => {

    //state to set data
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useToast();
    const { token } = useParams();
    const navigate = useNavigate();

    //show and hide password 
    const [show, setShow] =  React.useState(false);
    const handleClick = () => setShow(!show);

    const [showSec, setShowSec] =  React.useState(false);
    const handleClickSecond = () => setShowSec(!showSec);

    // function create new password 
    const handleNewPassword = async(e) => {
        e.preventDefault();

        //conditional for password dont match
        if (password != confirmPassword) {
            // if password dont match show alert 
            toast({
                title: 'Password and Confirm Password dont match', 
                description: 'Please Match Your Passowrd and Confirm Password',
                status: 'error',
                duration: 3500,
                isClosable: true,
                position: 'top', 
            });
            return;
        }

        // post password to api
        try {
            await axios.post(`https://7s81h0b9-4000.asse.devtunnels.ms/auth/reset/${token}`, {
                password: password,
            });

            toast({
                title: 'Change Password Succes',
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

    return(
        <>
            <Box className="reset-password">
                <Box paddingLeft="70px" color="white" paddingTop="20px">
                    <Link href="/">
                        <Img src={logo} alt="SocMedia" width="173px" height="47px" borderRadius="5px"></Img>
                    </Link>    
                </Box>

                <Box display='flex' justifyContent='flex-end' marginTop="150px" marginRight="160px">
                    <Flex flexDirection="column" justifyContent='space-between' gap={5}>
                        <Heading textAlign='center' textColor='white' fontSize='3xl' fontWeight='semibold'>Set New Password </Heading>
                        <Text textAlign='center' textColor='white' >Set New Password Below.!</Text>

                        <Box width='252px'>
                            <form onSubmit={handleNewPassword}>
                                <InputGroup size="md">
                                    <Input value={password} onChange={(e) => setPassword(e.target.value)} textColor='white' type={show ? 'text' : 'password'} placeholder="New Password" marginBottom='20px'></Input>
                                    <InputRightAddon w="3.5rem" bg="#D9D9D9">
                                        <Button h="1.75rem" size="sm" onClick={handleClick} bgColor="#D9D9D9" marginLeft='-5px'>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightAddon>
                                </InputGroup>

                                <InputGroup>
                                    <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showSec ? 'text' : 'password'} textColor='white' placeholder="Confirm New Password"></Input>
                                    <InputRightAddon w="3.5rem" bg="#D9D9D9">
                                        <Button h="1.75rem" size="sm" onClick={handleClickSecond} bgColor="#D9D9D9" marginLeft='-5px'>
                                            {showSec ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightAddon>
                                </InputGroup>
                                <Center>
                                    <Button type="submit" marginTop='20px'>Set New Password</Button>
                                </Center>
                            </form>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default ForgotPassword;