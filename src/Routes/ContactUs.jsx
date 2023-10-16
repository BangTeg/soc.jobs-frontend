import { Box, Flex, Image, Link, Text  } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer  from "../components/Footer";
import "../styles/All.css";
import contactUs from "../assets/contact.png";
import googleMap from "../assets/googleMap.png";
import locations from "../assets/locations.png";
import phone from "../assets/phone.png";

const ContactUs = () => {
    return(
        <>
        <Navbar />
        
        <Box className="contactUs">
            <Flex direction="column" gap={8}>
                <Box paddingTop="8%" paddingLeft="30%">
                    <Image src={contactUs} alt="contactUs"></Image>
                </Box>
                <Box paddingLeft="5%" display="flex" gap={10}>
                    <Box w="50%" h="50%">
                        <Image src={googleMap} alt="googleMap" position="relative" _hover={{transform: "scale(1.1)",transition: "transform 1s ease",}}></Image>
                    </Box>
                    <Box display="flex" gap={10} flexDirection="column">
                        <Box marginTop="3%" display="flex" gap={7}>
                                <Image w="8%" h="75%" src={locations} alt="locations" _hover={{transform: "scale(1.1)",}}></Image>
                                <Link color="white" target="blank" href="https://www.google.com/maps/place/SOCMedia+Agency+(Jasa+Digital+Marketing+-+Creative+Agency+Solo)/@-7.5454375,110.7890603,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a15a3c8b8860b:0x82b030275ccc4bc0!8m2!3d-7.5454428!4d110.7916352!16s%2Fg%2F11k6f1vl0t?entry=ttu">
                                    Jl. Mawar Raya No.A42, Baturan, Kec. Colomadu, <br/>
                                    Kab. Karanganyar, Jawa Tengah 57171
                                </Link>
                        </Box>
                        <Box display="flex" gap={7}>
                            <Image w="8%" h="75%" src={phone} alt="phone" _hover={{transform: "scale(1.1)",}}></Image>
                            <Text color="white" size="md">hello@socmediaagency.com <br/>
                            +62 813 2710 5454
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>

        <Footer/>
        </>
    )
}

export default ContactUs;