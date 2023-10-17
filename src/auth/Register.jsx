import React from "react";
import {Spinner, Box, Link, Text, Stack, Img, Center, Card, CardHeader, Input, InputGroup, InputRightAddon, Button, useToast } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Register = () => {
    //hide and show password
    const [show, setShow] =  React.useState(false)
    const handleClick = () => setShow(!show)

    //hide and show password 
    const [show2, setShow2] =  React.useState(false)
    const handleClick2 = () => setShow2(!show2)
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleCreateAccount = async(e) => {
        e.preventDefault();

        //checking confirm password and password must match

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


        //fetch api register, if done navigate to complete verify data 
        try {
            await axios.post("https://50cglb1j-4000.asse.devtunnels.ms/auth/register",{
                name: name,
                email: email,
                password: password,
            });

            //  navigate("/register/verify");

            toast({
                title: 'Created Account Success', 
                description: 'Check Your Email To Verify',
                status: 'success',
                duration: 10000,
                isClosable: true,
                position: 'top', 
            });
                
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <>
        <Box className="register">
            <Box paddingLeft="70px" color="white" paddingTop="20px">
                <Link href="/">
                    <Img src={logo} alt="SocMedia" width="173px" height="47px" borderRadius="5px"></Img>
                </Link>    
            </Box>
            <Center display="flex" flexDirection="row" justifyContent="flex-end" paddingRight="100px">
                <Card bgColor="transparent" align="center" className="registerCard" variant="unstyled" paddingBottom="20px" borderRadius="30px">
                    <CardHeader>
                        <Center>
                            <Img src={user} alt="user" width="108px" height="108px"></Img>
                        </Center>
                        <br/>
                        <Center textColor="white" >
                            <Text fontSize="2xl" fontWeight="bold" paddingBottom="10px">
                                CREATE YOUR NEW ACCOUNT !
                            </Text>
                        </Center>
                    </CardHeader>
                        <Text textAlign="center">{msg}</Text>
                    <form onSubmit={handleCreateAccount}>
                        <Stack spacing={5} alignItems="center">
                            <tr>
                                <td>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" type="text" textAlign="left" borderRadius="10px" textColor="#D9D9D9" width="284px"></Input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="text" textAlign="left" borderRadius="10px" textColor="#D9D9D9" width="284px"></Input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <InputGroup size="md">
                                        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type={show ? 'text' : 'password'} textAlign="left" borderRadius="10px" textColor="#D9D9D9"></Input>
                                            <InputRightAddon w="4.5rem" bg="#D9D9D9"> 
                                                <Button h="1.75rem" size="sm" onClick={handleClick} bgColor="#D9D9D9">
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightAddon>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <InputGroup size="md">
                                        <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" type={show2 ? 'text' : 'password'} textAlign="left" borderRadius="10px" textColor="#D9D9D9"></Input>
                                            <InputRightAddon w="4.5rem" bg="#D9D9D9"> 
                                                <Button h="1.75rem" size="sm" onClick={handleClick2} bgColor="#D9D9D9">
                                                    {show2 ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightAddon>
                                    </InputGroup>
                                </td>
                            </tr>
                            <Box>
                                <Button borderRadius="10px" bgColor="none" type="submit">CREATE AN ACCOUNT</Button>
                            </Box>
                        </Stack>
                    </form>
                    <br/>
                        <Box paddingLeft="20px" paddingRight="20px"> 
                            <Text textColor="white" textAlign="center">
                                By registering, you agree to the <br/>
                                Terms and Conditions of SOCJOB.
                            </Text>
                        </Box>
                        <br/>
                        <Center>
                        <Box>
                            <Text textColor="white">Already a Account ? &nbsp;
                                <Link href="/login" textColor="#20B15A" fontStyle="Ramabhadra" fontWeight="bold">
                                    &nbsp;<u>Login</u>
                                </Link>
                            </Text>
                        </Box>
                        </Center>
                </Card>
            </Center>
        </Box>
        </>
    );
};

export default Register;