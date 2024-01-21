import React from "react";
import { Card, Flex, Center, CardBody, Text, CardHeader,
    Heading, CardFooter, Button, Image, Box, Link, useToast } from "@chakra-ui/react";
import Navbar  from "../components/Navbar";
import Footer  from "../components/Footer";
import NotFound  from "../auth/NotFound";
import "../styles/All.css";
import jobs from "../assets/jobs.png";
import soc_software_house from "../assets/soc-software-house.png";
import soccersEO from "../assets/socers-eo.png";
import socLyfe from "../assets/soc-lyfe.png";
import goodLife from "../assets/good-visual.png";
import socMedia from "../assets/soc-media-digital-marketing-agency.png";
import Fulltime from "../assets/fulltime.png";
import Freelance from "../assets/freelance.png";
import Internship from "../assets/internship.png";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  axios  from "axios";

const DashboardUser = () => {
    const [isLogged, setIsLogged] = useState(localStorage.getItem('access_token'));
    const [cv, setCv] = useState();
    const [avatar, setAvatar] = useState();
    const toast = useToast();
    // console.log(avatar)
    useEffect(() => {
        const handleGetProfile = async() => {
            await axios.get("https://7s81h0b9-4000.asse.devtunnels.ms/user/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .then((response) => {
                setCv(response.data.data.cv);
                setAvatar(response.data.data.avatar);
                // console.log(response.data.data.cv)
                if (!response.data.data.cv || !response.data.data.avatar ) {
                    toast({
                        title: 'Please Upload Your Cv and Profile',
                        description: 'Upload Before Apply Jobs.!',
                        status: "warning",
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                return error;
            })
        };
        handleGetProfile();
    }, []);


    //slider pcture logo division soc 
    const settings = {
        // dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const images = [
        {src: soc_software_house, alt: "software house"},
        {src: soccersEO, alt: "soccers EO"},
        {src: socLyfe, alt: "socLyfe"},
        {src: goodLife, alt: "goodLife"},
        {src: socMedia, alt: "socMedia"},
    ]

    return (
        <>
        {DashboardUser}
        <Navbar />
        <Box className="firstPage">
            {/* Display teks & gambar */}
            <Box paddingBottom="30px" paddingTop="120px" paddingLeft="20px">
                <Flex justifyContent="space-between">
                    <Box display="flex" justifyContent="center" alignItems="center" >
                        <Card bg="#111215" width="100">
                            <CardHeader  marginLeft="10px" marginRight="20%">
                                <Heading lineHeight="70px" bgGradient="linear(90deg, #169FC2 -8.13%, #8D64BC 43.63%, #EE5471 104.46%)" bgClip='text' fontSize='6xl' fontWeight="bold" fontFamily="poppins , sans-serif" >Make Your Dream Come True With SOC Media Agency</Heading>
                            </CardHeader>
                        <CardBody marginLeft="10px">
                            <Text fontSize="lg" textColor="#D9D9D9">Find a Chance to Join With Us!</Text>
                        </CardBody>
                        <CardFooter marginLeft="10px">
                            <Button variant="outline" color="white">Get Started</Button>
                        </CardFooter>
                        </Card>
                    </Box>
                    <Box display="flex" marginRight="35px" paddingRight="30px" className="card">
                        <Image width="1200px" height="400px" borderRadius="10px" src={jobs} alt="jobsoc" style={{ imageRendering: "smooth" }}></Image>
                    </Box>
                </Flex>
            </Box>            
           
            {/* display logo berjalan */}
            <Box> 
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <Box key={index} className="slider-container">
                            <Image src={image.src} alt={image.alt} w="110px" h="110px"></Image>
                        </Box>
                    ))}
                </Slider>
            </Box>

            {/* display page 2 */}
            <Box paddingTop="70px">
                <Center>
                    <Text bgGradient="linear(90deg, #169FC2 -8.13%, #8D64BC 43.63%, #EE5471 104.46%)" bgClip='text' fontSize='5xl' fontWeight="bold" fontFamily="poppins , sans-serif">Be Part of Our Company</Text>
                </Center>
                <Center>
                    <Text fontSize="lg" textColor="#D9D9D9">Below are some exciting positions you can apply for!</Text>
                </Center>
            </Box>
            <Box paddingTop="50px">
                <Flex gap="10px" justifyContent="space-between" padding="30px" paddingRight="80px" paddingLeft="80px">
                    <Card width="378px" bg="none" className="card">
                        <CardHeader>
                            <Image src={Fulltime} alt="Fulltime" w="378px" h="166px" borderRadius="8px"></Image>
                            <Heading size='md'textColor="white" paddingTop="10px"> Full Time</Heading>
                        </CardHeader>
                        <CardBody marginTop="-3">
                            <Text textColor="#D9D9D9">kita bantu kkalian buat cari tempat kerja dengan mudah, sini daftar!!! selama kuota tersedia yaa</Text>
                        </CardBody>
                        <CardFooter>
                        <Link href="/userHome/FullTime">
                            <Button variant="outline" color="white">View More</Button>
                        </Link>
                        </CardFooter>
                    </Card>
                    <Card width="378px" bg="none" className="card">
                        <CardHeader>
                            <Image src={Freelance} alt="Freelance" w="378px" h="166px" borderRadius="8px"></Image>
                            <Heading size='md'textColor="white" paddingTop="10px"> Freelance </Heading>
                        </CardHeader>
                        <CardBody marginTop="-3">
                            <Text textColor="#D9D9D9">kita bantu kkalian buat cari tempat kerja dengan mudah, sini daftar!!! selama kuota tersedia yaa</Text>
                        </CardBody>
                        <CardFooter>
                            <Link href="/userHome/FreeLance">
                                <Button variant="outline" color="white">View More</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card width="378px" bg="none" className="card">
                        <CardHeader>
                            <Image src={Internship} alt="Internship" w="378px" h="166px" borderRadius="8px"></Image>
                            <Heading size='md'textColor="white" paddingTop="10px"> Internship </Heading>
                        </CardHeader>
                        <CardBody marginTop="-3">
                            <Text textColor="#D9D9D9">kita bantu kkalian buat cari tempat kerja dengan mudah, sini daftar!!! selama kuota tersedia yaa</Text>
                        </CardBody>
                        <CardFooter>
                            <Link href="/userHome/Internship">
                                <Button variant="outline" color="white">View More</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </Flex>
            </Box>
        </Box>
        <Footer/>
        
        </>
    );
};

export default DashboardUser;
