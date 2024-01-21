import React from "react";
import { useState } from "react";
import { useDisclosure, useToast, Link, Spacer, Heading, Box, Table, Img, Text, Flex, Button, Input, InputRightAddon, InputGroup, ModalOverlay, Modal, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

//show and hide password 
    const [show, setShow] =  React.useState(false)
    const handleClick = () => setShow(!show)

// proses login untuk mendapatkan token dan menyimpan pada local
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    //overlay on if forgot password onClick
    const OverlayModal = () => (
        <ModalOverlay bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'/>
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayModal />)

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            //proses login ke REstful API
            const response = await fetch("https://7s81h0b9-4000.asse.devtunnels.ms/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const accessToken = data.token;
                const userRole = data.role;

                // Simpan access token di local storage
                localStorage.setItem("access_token", accessToken);

                //conditional for admin and user 
                if (userRole === "Admin") {
                    setTimeout(() => {
                        window.location.href="/backoffice/dashboard";
                    }, 1500);
                    
                     //alert on tampilan
                     toast({
                        title: 'Login Success', 
                        description: 'Welcome Admin',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top', 
                    })
                }
                else{
                    setTimeout(() => {
                        window.location.href="/userHome";
                    }, 1500);

                    //alert on tampilan
                    toast({
                        title: 'Login Success', 
                        description: 'Happy Apply!',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top', 
                    })
                }

                
            } else {
                console.error("Login failed");

                //menampilkan alert pada tampilan
                toast({
                    title: 'Login Failed!!', 
                    description: 'Please Check Your Email or Password!',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top', 
                })
            }

        } catch (error) {
            console.error(error);            
        }
    };

    const handleForgotPassword = async(e) => {
        if (e) {
            e.preventDefault();
        }
        
        //post data to api and get email

        try {
            await axios.post('https://7s81h0b9-4000.asse.devtunnels.ms/auth/reset',{
                email: email,
            });

            //menampilkan alert berhasil pada tampilan
            toast({
                title: 'Email send', 
                description: 'Please Check Your Email Box to Verify',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top', 
            });

        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect the user to the Google OAuth route on your Node.js backend
         window.location.href = 'https://7s81h0b9-4000.asse.devtunnels.ms/auth/google';

    };

    return (
        <>
        <Box className="login" >
            <Box paddingLeft="30px" color="white" paddingTop="20px">
                <Link href="/">
                    <Img src={logo} alt="SocMedia" width="173px" height="47px" borderRadius="5px"></Img>
                </Link>
            </Box>

            <Flex paddingTop="60px" paddingRight="160px" flexDirection="column" alignItems="flex-end" gap="20px">
               
                <Box display="flex" >
                    <Heading color="white" textAlign="center"> Login to SOCJOBS </Heading>
                </Box>

                <Box display="flex" >
                    <Text textColor="#D9D9D9">Login to your SOCJOBS account to continue</Text>
                </Box>
                <Spacer/>
                
                <Box display="flex" paddingRight="10px">
                    <form onSubmit={handleLogin}>
                        <Table>
                            <tr>
                                <td><Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="text" textAlign="left" borderRadius="10px" textColor="#D9D9D9"></Input></td>
                            </tr>
                            <br/>
                            <tr>
                                <td>
                                    <InputGroup size="md">
                                    <Input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type={show ? 'text' : 'password'} textAlign="left" borderRadius="10px" textColor="#D9D9D9"></Input>
                                    <InputRightAddon w="4.5rem" bg="#D9D9D9"> 
                                        <Button h="1.75rem" size="sm" onClick={handleClick} bgColor="#D9D9D9">
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightAddon>
                                    </InputGroup>
                                </td>
                            </tr>
                            <br/>
                            <Box paddingLeft="105px">
                                <Button onClick={handleLogin} borderRadius="10px" bgColor="none" type="submit" value="login">LOG IN </Button>
                            </Box>
                        </Table>
                    </form>
                </Box>

                <Box padding="4px" paddingRight="87px" marginTop='-18px'>
                    <Link textColor="red.500" fontSize="sm" onClick={() => {
                        onOpen()
                        }}>Forgot password? </Link>
                </Box>

                <Box padding="4px" paddingRight="125px">
                    <Text textColor="white" fontSize="lg"> /Or </Text>
                </Box>

                {/* <Box paddingRight="45px">
                    <Button onClick={handleGoogleLogin}>
                        <Img src={google} borderRadius="10px" w="30px" h="30px"></Img> Log In with Google
                    </Button>
                </Box> */}

                <Box paddingRight="36px" paddingTop="10px">
                    <Text textColor="#D9D9D9">Don't Have Account ? &nbsp;
                        <Link href="/register" fontSize="xl" textColor="#20B15A"><u>Sign Up</u></Link>
                    </Text>
                </Box>
            </Flex>

            {/* Modal if forgot password onclick */}
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <form onSubmit={handleForgotPassword}>
                    <ModalContent>
                        <ModalHeader>forgot password</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Text>Please input your email and check your email box</Text>
                            <br/>
                            <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" onClick={onClose}>Send</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
            </Box>
        </>
    );
};

export default Login;