import React from "react";
import { useState } from "react";
import { useToast, Link, Spacer, Heading, Box, Table, Img, Text, Flex, Button, Input, InputRightAddon, InputGroup  } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";

const Login = () => {

const [show, setShow] =  React.useState(false)
const handleClick = () => setShow(!show)

// proses login untuk mendapatkan token dan menyimpan pada local
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            //proses login ke REstful API
            const response = await fetch("https://50cglb1j-4000.asse.devtunnels.ms/auth/login", {
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

                // Simpan access token di local storage
                localStorage.setItem("access_token", accessToken);

                // mengarahkan pengguna ke dashbord 
                navigate("/userHome");
                console.log(data);

                //menampilkan allert login success
                setAlertVisible(true);
                setAlertMessage("Login Berhasil!");

                //alert on tampilan
                toast({
                    title: 'Login Success', 
                    description: 'Happy Apply!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top', 
                })
            } else {
                console.error("Login failed");

                //menampilkan allert login gagal
                setAlertVisible(true);
                setAlertMessage("Login Gagal, Periksakembali email dan password Anda!");

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

                <Box padding="4px" paddingRight="125px">
                    <Text textColor="white" fontSize="lg"> Atau </Text>
                </Box>

                <Box paddingRight="45px">
                    <Button>
                        <Img src={google} borderRadius="10px" w="30px" h="30px"></Img> Log In with Google
                    </Button>
                </Box>

                <Box paddingRight="36px" paddingTop="10px">
                    <Text textColor="#D9D9D9">Don't Have Account ? &nbsp;
                        <Link href="/register" fontSize="xl" textColor="#20B15A"><u>Sign Up</u></Link>
                    </Text>
                </Box>
            </Flex>
            </Box>
        </>
    );
};

export default Login;