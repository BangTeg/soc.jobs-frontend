import {AvatarBadge, Spacer, useDisclosure} from '@chakra-ui/react'
import "../styles/All.css";
import { Box, Button, Flex, Link, Img, useToast} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider, Avatar} from '@chakra-ui/react'
import logo from "../assets/logo.png";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,} from '@chakra-ui/react'


const NavBar = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [isLogged, setIsLogged] = useState(localStorage.getItem('access_token') ? true : false);
    const [nama, setNama] = useState("");
    const [avatar, setAvatar] = useState(null);
    
    useEffect(() => {
        //conditional for fetch if isLogged
        if (isLogged) {
            // console.log(accessToken);
            axios.get(`https://7s81h0b9-4000.asse.devtunnels.ms/user/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .then((response) => {    
                //get name from field name 

                const name = response.data.data.name.split(' ')[0];
                setNama(name);
            })
            .catch(error => {
                console.error('Terjadi kesalahan dalam permintaan HTTP:', error);
            });
            }
            handleAvatar();
    }, []);

    //function for get avatar

    const handleAvatar = async() => {
        
        if (isLogged) {
            await axios.get("https://7s81h0b9-4000.asse.devtunnels.ms/user/avatar", {
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

    // fungsi for logout
    const handleLogout = () => {
        //hapus token akses dari localstorage
        localStorage.removeItem("access_token");

        //redirect ke halaman home 
        setTimeout(() => {
            window.location.href="/";
        }, 1000);

        toast({
            title: 'Your Loggin Out', 
            description: 'If you wont to Login clik button on the top right',
            status: 'info',
            duration: 2500,
            isClosable: true,
            position: 'top', 
        });
    }

    //for modal before logout
    const {isOpen, onOpen, onClose} = useDisclosure()

    
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
                <Link color="white" href="/faq">
                    FAQ
                </Link>
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
                <Link color="white" href="/userHome/faq">
                    FAQ
                </Link>
                <Link color="white" href="userHome/aboutus">
                    About Us
                </Link>
                <Link color="white" href="userHome/contactus">
                    Contact Us
                </Link>
                <Menu>
                    <MenuButton color="#FFFFFF" borderRadius='md' border="none" transition='all 0.2s'>
                        {nama.charAt(0).toUpperCase() + nama.slice(1)} <ChevronDownIcon/>
                    </MenuButton>
                    <MenuList bgColor="#272829">
                        <MenuItem bgColor="#272829" color="#FFFFFF" as='a' href='/userHome/Profile' _hover={{ bgColor: '#F7FAFC', color: 'black' }}>Profile</MenuItem>
                        <MenuItem bgColor="#272829" color="#FFFFFF" as='a' href='/userHome/HistoryApplicant' _hover={{ bgColor: '#F7FAFC', color: 'black' }}>History Lamaran</MenuItem>
                        <MenuDivider/>
                        <MenuItem bgColor="#272829" color="#CE1C1C" onClick={onOpen} _hover={{ bgColor: '#F7FAFC', color: 'red' }}>Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader>
                                        Log Out
                                    </ModalHeader>
                                    <ModalCloseButton/>
                                    <ModalBody>
                                        Are you sure you want to logout ?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={onClose} mr={3}>Cancel</Button>
                                        <Button onClick={handleLogout} colorScheme='red'>Logout</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
            </Box>
            <Box display="flex" alignItems="center" gap="20px" justifyContent="space-between" paddingRight="40px" className="avatar-container">
                {avatar ? (
                    <Avatar src={avatar} className="avatar"></Avatar>
                ) : (
                    <Avatar name={nama.charAt(0).toUpperCase() + nama.slice(1)} bgGradient="linear(90deg, #2E93C1 0%, #8E64BC 51.04%, #B9507A 100%)" className="avatar"></Avatar>
                )}
            </Box>
            </Flex>
        ) };
        </>
    );
};

export default NavBar;
