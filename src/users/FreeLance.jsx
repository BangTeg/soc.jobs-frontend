import Navbar  from "../components/Navbar";
import React, { useState, useEffect } from "react";
import Footer  from "../components/Footer";
import "../styles/All.css";
import { Image, Flex, Button, Box, Select, Text, Card, CardBody, CardHeader, CardFooter, Link } from "@chakra-ui/react";
import Social_Media from "../assets/social_media.png";
import UI_UX_Design from "../assets/web_design.png";
import Branding from "../assets/branding.png";
import Digital_ADV from "../assets/ads.png";
import Live_Streaming_Event from "../assets/live_streaming_event.png";
import Photo_Vidio from "../assets/photo_video.png";
import Seo_Sem from "../assets/seo_sem.png";
import Web_Development from "../assets/web_development.png";

const FreeLance = () => {
    
    // filter by positions
    const [selectedPosition, setSelectedPosition] = useState("");

    //set for show 
    const[visibleJobs, setVisibleJobs] = useState(0);

    // Array Of Objects Job Data For Mapping 
    const jobData = [
        {
            title: "Social Media Management",
            img: Social_Media,
            link: "/FreeLance/SocmedManagement"
        },
        {
            title: "UI/UX Design",
            img: UI_UX_Design,
            link: "/FreeLance/UIUXDesign"
        },
        {
            title: "Branding",
            img: Branding,
            link: "/FreeLance/Branding"
        },
        {
            title: "Digital Advertising",
            img: Digital_ADV,
            link: "/FreeLance/DigitalADS"
        },
        {
            title: "Live Streaming Event",
            img: Live_Streaming_Event,
            link: "/FreeLance/LiveStreamingEvent"
        },
        {
            title: "Photo and Vidio",
            img: Photo_Vidio,
            link: "/FreeLance/Photo&Vidio"
        },
        {
            title: "SEO and SEM",
            img: Seo_Sem,
            link: "/FreeLance/SEO&SEM"
        },
        {
            title: "Web Development",
            img: Web_Development,
            link: "/FreeLance/WebDevelopment"
        },
    ];

    // effect hook for display one by one 
    useEffect(() => {
        const interval = setInterval(() => {
          // add job to display one by one 
          if (visibleJobs < jobData.length) {
              setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 1)
          }
        }, 1000);
      
        return () => clearInterval(interval); 
      }, [jobData]);

    // Mapping data Job and Return to Element
    const jobElements = jobData.map((job, index) => (
        <Box key={index} width="40%" height="100%" marginLeft={index % 2 === 0 ? "5%" : "55%"}
        _hover={{transform: "scale(1.05)", transition: "transform 0.5s"}}
        style={{
            display: "block",
            opacity: index < visibleJobs ? 1 : 0, // Mengatur opacity elemen
            transition: "opacity 0.5s", // Menggunakan transition untuk mengatur efek muncul secara halus
          }}>
            <Card bg="none" variant="outline" borderRadius="15px">
            <Image src={job.img} alt={job.title} borderTopRadius="15px" _hover={{ filter: "brightness(1.5)" }}></Image>
                <CardHeader textAlign="center" fontSize="xl" fontWeight="semibold" textColor="white"> 
                    {job.title}
                </CardHeader>
                <CardFooter>
                    <Link href={job.link}>
                        <Button>Details</Button>
                    </Link>
                </CardFooter>
            </Card>
        </Box>
    ))

    return(
        <>
        <Navbar/>
            <Box className="jobs-position" paddingTop="6%" display="flex" flexDirection="column" gap="4%">
                <Box marginLeft="5%" marginRight="5%">
                    <Text fontSize="5xl" fontWeight="bold" fontFamily="poppins" bgGradient="linear(90deg, #169FC2 -8.13%, #8D64BC 43.63%, #EE5471 104.46%)" bgClip='text'>
                        FreeLance Jobs 
                    </Text>
                </Box>
                <Box bgColor="#353538" padding="1.5%" marginTop="-5%" marginLeft="5%" marginRight="5%" borderRadius="2xl">
                    <Box paddingRight="80%">
                        <Select onChange={(e) => setSelectedPosition(e.target.value)} bgColor="#D9D9D9" variant="solid" placeholder="Positions" textColor="black">
                            {jobData.map((job, index) => (
                                <option key={index} value={job.title}>
                                    {job.title}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Box>

                {/* Show All jobs Data and Calss jobElements components */}

                {selectedPosition === "" ? (
                <Flex justifyContent="space-between" flexDirection="column" gap="20px" marginTop="-4%" marginLeft="5%" marginRight="5%">
                    {jobElements}
                </Flex>
                ) : (
                <Flex justifyContent="space-between" flexDirection="column" gap="20px" marginTop="-4%" marginLeft="5%" marginRight="5%">
                   {jobData.map((job, index) => (
                        selectedPosition === job.title && (
                            <Box key={index} width="40%" height="100%" marginLeft="5%"> 
                                <Card bg="none" variant="outline" borderRadius="15px">
                                    <Image src={job.img} alt={job.title} borderTopRadius="15px" _hover={{ filter: "brightness(1.5)" }}></Image>
                                        <CardHeader textAlign="center" fontSize="xl" fontWeight="semibold" textColor="white">
                                            {job.title}
                                        </CardHeader>
                                        <CardFooter>
                                            <Link href={job.link}>
                                                <Button>Details</Button>
                                            </Link>
                                        </CardFooter>
                                </Card>
                            </Box>
                        )
                    ))}
                </Flex>
                )}
            </Box>
        <Footer/>
        </>
    );
};

export default FreeLance;