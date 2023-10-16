import React from "react";
import Slider from "react-slick";
import { Card, Flex, Center, CardBody, Text, CardHeader,
     Heading, CardFooter, Button, Image, Box, Link } from "@chakra-ui/react";
import Navbar  from "../components/Navbar";
import Footer  from "../components/Footer";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
   
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
        <Navbar />
        <Box className="firstPage" >
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
                            <Link href="/login">
                                <Button variant="outline" color="white">Get Started</Button>
                            </Link>
                            
                        </CardFooter>
                        </Card>
                    </Box>
                    <Box display="flex" marginRight="35px" paddingRight="30px" className="card">
                        <Image width="1200px" height="400px" borderRadius="10px" src={jobs} alt="jobsoc" style={{ imageRendering: "smooth" }}></Image>
                    </Box>
                </Flex>
            </Box>   

            {/* display logo v2 */}
            
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
                {/* <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' justifyContent="space-between"> */}
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
                        <Link href="/login">
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
                            <Link href="/login">
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
                            <Link href="/login">
                                <Button variant="outline" color="white">View More</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </Flex>
                {/* </SimpleGrid>  */}
            </Box>
        </Box>
        <Footer/>
        </>
    );
};

export default Home;

{/* display logo  */}
            {/* <Box>
                <Flex flexDirection="row" gap="100px" justifyContent="space-between">
                    <Box display="flex" justifyContent="center" alignItems="center" className="image" paddingLeft="20px">
                        <Image src={soc_software_house} alt="software house" w="91px" h="91px"></Image>
                    </Box>
                    <Box display="flex" alignContent="center" justifyContent="center" alignItems="center" className="image">
                        <Image src={soccersEO} alt="soccers EO" w="111px" h="111px"></Image>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" className="image">
                        <Image src={socLyfe} alt="socLyfe" w="106px" h="106px"></Image>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" className="image">
                        <Image src={goodLife} alt="goodLife" w="101px" h="101px"></Image>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" alignContent="center" className="image" paddingRight="20px">
                        <Image src={socMedia} alt="socMedia" w="132px" h="132px"></Image>
                    </Box>
                </Flex>
            </Box> */}