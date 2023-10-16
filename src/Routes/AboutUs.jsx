import { Link, Button, Image, Box, Flex, Heading, Text, Center, Card, CardBody, CardFooter, CardHeader} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer  from "../components/Footer";
import "../styles/All.css";
import tegar from "../assets/tegar.png";
import drajad from "../assets/drajad.png";
import dipe from "../assets/dipe.png";

const AboutUs = () => {
    return(
        <>
            <Navbar />
            <Box className="aboutUs" paddingTop="9%" paddingLeft="10" paddingRight="10">
                <Flex flexDirection="column" gap="7" justifyContent="space-between">
                    <Box>
                        <Heading bgGradient="linear(90deg, #169FC2 -8.13%, #8D64BC 43.63%, #EE5471 104.46%)" bgClip="text" size="2xl" fontFamily="poppins , sans-serif">Tentang SOCJobs*</Heading>
                    </Box>
                    <Box paddingTop="1%">
                        <Text fontFamily="poppins , sans-serif" textColor="#FFFFFF" fontSize="lg">SOC JOBS Merupakan wadah untuk memberikan lowongan pekerjaan yang telah di sediakan oleh SOC Media Agency.</Text>
                    </Box>
                    <Box>
                        <Text fontFamily="poppins , sans-serif" textColor="#FFFFFF" fontSize="lg" as="div">SOCMedia merupakan Creative & Digital Marketing Agency di kota Solo yang membantu berbagai cakupan perusahaan <br/>
                            mulai dari bisnis UMKM, startup, corporate, hingga instansi pemerintah dalam melakukan perencanaan strategi <br/>
                            pemasaran digital.</Text>
                    </Box>
                    <Box>
                        <Text fontFamily="poppins , sans-serif" textColor="#FFFFFF" fontSize="lg" as="div">Sejak tahun 2020, SOC Media Agency telah membantu lebih dari 100+ mitra bisnis di Indonesia mulai dari perencanaan<br/>
                         media hingga produksi konten. Di bawah manajemen PT. Media Mulia Bersama, kami terus berkomitmen untuk<br/>
                          menciptakan layanan berkualitas dengan mengumpulkan tim yang profesional, kreatif, dan kompeten.</Text>
                    </Box>
                    <Box marginTop="5%" border="2px solid white" borderRadius="2xl">
                        <Center padding="10px">
                            <Text fontFamily="poppins , sans-serif" fontSize="xl" textColor="white">Our Team</Text>
                        </Center>
                    </Box>
                    <Box>
                        <Flex gap="5px" justifyContent="space-between" padding="30px" paddingRight="80px" paddingLeft="80px">
                            <Card bg="none" className="card">
                                <CardHeader>
                                    <Box className="aboutUs-container">
                                    <Image src={tegar} alt="Tegar" w="300px" h="350px" borderRadius="8px" className="profile-image" />
                                    <Box className="hover-info">
                                        <Text>Tegar Danardana Lokananta</Text>
                                        <Text>L200200223</Text>
                                        <Text>Back End Engineer</Text>
                                    </Box>
                                    </Box>
                                </CardHeader>
                            </Card>
                            
                            <Card bg="none" className="card">
                                <CardHeader>
                                    <Box className="aboutUs-container">
                                    <Image src={drajad} alt="Drajad" w="300px" h="350px" borderRadius="8px" className="profile-image" />
                                    <Box className="hover-info">
                                        <Text>Tegar Drajad Syah Vadiga</Text>
                                        <Text>L200200097</Text>
                                        <Text>Front End Engineer</Text>
                                    </Box>
                                    </Box>
                                </CardHeader>
                            </Card>
                            
                            <Card bg="none" className="card">
                                <CardHeader>
                                    <Box className="aboutUs-container">
                                    <Image src={dipe} alt="Dipe" w="300px" h="350px" borderRadius="8px" className="profile-image" />
                                    <Box className="hover-info">
                                        <Text>Diva Ramadhan Radityatama</Text>
                                        <Text>L200200078</Text>
                                        <Text>UI/UX Designer</Text>
                                    </Box>
                                    </Box>
                                </CardHeader>
                            </Card>
                    </Flex>
                    </Box>
                </Flex>
            </Box>
        <Footer/>
        </>
    )
}

export default AboutUs;