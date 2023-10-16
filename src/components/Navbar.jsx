import {Spacer} from '@chakra-ui/react'
import "../styles/All.css";
import { Box, Button, Flex, Link, Img, useToast} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import loadingScreen from "./LoadingScreen";

const NavBar = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [isLogged, setIsLogged] = useState(localStorage.getItem('access_token') ? true : false)

    const handleNavbar = () => {
    if (!localStorage.getItem("access_token")) {
        return setLoading(false);
    }
    else if (localStorage.getItem("access_token")) {      
        return setLoading(true);
    } 
    }   

    const handleLogout = () => {
        //hapus token akses dari localstorage
        localStorage.removeItem("access_token");

        //redirect ke halaman home 
        navigate("/");

        toast({
            title: 'Your Loggin Out', 
            description: 'If you wont to Login clik button on the top right',
            status: 'info',
            duration: 2500,
            isClosable: true,
            position: 'top', 
        });

        {loadingScreen}
    }

    return (
        <>
        {/* Membuat navigasi bar  */}
        {!isLogged ? (
            <Flex top="0" left="0" right="0" zIndex="999" justifyContent='space-between' className="myNavBar">
            <Box paddingLeft="40px" color="white" display="flex">
                <Link href='/'>
                <Img src={logo} alt="SocMedia" width="173px" height="47px" borderRadius="5px"></Img>
                </Link>
            </Box>
            <Spacer/>
            <Box display="flex" justifyContent="space-between" gap="20px" alignContent="flex-end" paddingRight="20px">
                <Link color="white" href="/aboutus">
                    About Us
                </Link>
                <Link color="white" href="contactus">
                    Contact Us
                </Link>
            </Box>
            <Box display="flex" alignItems="center" gap="20px" justifyContent="space-between" paddingRight="40px">
                <Link href="/login">
                    <Button color="white" variant="outline">Login</Button> 
                </Link>
                <Link href="/register" >
                    <Button  bgGradient="linear(90deg, #2E93C1 0%, #8E64BC 51.04%, #B9507A 100%)" variant="solid" textColor="white">Register</Button> 
                </Link>
            </Box>
            </Flex>
        ) : (
            <Flex top="0" left="0" right="0" zIndex="999" justifyContent='space-between' className="myNavBar">
            <Box paddingLeft="40px" color="white" display="flex">
                <Link href='/userHome'>
                <Img src={logo} alt="SocMedia" width="173px" height="47px" borderRadius="5px"></Img>
                </Link>
            </Box>
            <Spacer/>
            <Box display="flex" justifyContent="space-between" gap="20px" alignContent="flex-end" paddingRight="20px">
                <Link color="white" href="/aboutus">
                    About Us
                </Link>
                <Link color="white" href="contactus">
                    Contact Us
                </Link>
            </Box>
            <Box display="flex" alignItems="center" gap="20px" justifyContent="space-between" paddingRight="40px">
                <Button onClick={handleLogout} bgGradient="linear(90deg, #2E93C1 0%, #8E64BC 51.04%, #B9507A 100%)" variant="solid" textColor="white">Logout</Button> 
            </Box>
            </Flex>
        ) };
        </>
    );
};

export default NavBar;
