import { Box, Flex, Image, Link, Text  } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer  from "../components/Footer";
import "../styles/All.css";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

const ContactUs = () => {
    return(
        <>
        <Navbar />
            <Box className="faq">
                <Flex flexDir='column' marginTop="30px" marginLeft="140px">
                    <Text bgGradient="linear(90deg, #169FC2 -15%, #8D64BC 15%, #EE5471 50%)" bgClip='text' fontSize='200' fontWeight="bold" fontFamily="poppins , sans-serif">
                        FAQ
                    </Text>

                    <Text color='white' fontFamily='poppins' fontSize='27' fontWeight='light' marginLeft="17px" marginTop='-30px'>
                        "ini pertanyaan yang biasanya ditanyakan oleh calon pelamar
                    </Text>

                    <Accordion defaultIndex={[0]} allowMultiple marginTop="50px" width="4xl" border={"none"} boxShadow="none"> 
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left' color="white" fontSize={"3xl"}>
                                    Apa sih SOC JOBS itu ?
                                </Box>
                                <AccordionIcon color="white"/>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} color="black" fontSize={"2xl"} bgColor="#D9D9D9" borderRadius="15px">
                                SOC JOBS adalah tempat untuk membuka lowongan pekerjaan yang ada di SOCMEDIA.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left' color={"white"} fontSize={"3xl"}>
                                    Apa saja devisi yang dapat saya daftar ?
                                </Box>
                                <AccordionIcon  color="white"/>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} color={"black"} fontSize={"2xl"} bgColor="#D9D9D9" borderRadius="15px">
                                SOCMEDIA adalah Agensi Digital Marketing yang ada di kota Solo, 
                                melayani berbagai kebutuhan klien terkait Branding dan sebagai konsultan kebutuhan Digital Marketing
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left' color={"white"} fontSize={"3xl"}>
                                    Bagaimana cara agar bisa melamar di SOC JOBS ?
                                </Box>
                                <AccordionIcon  color="white"/>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} color={"black"} fontSize={"2xl"} bgColor="#D9D9D9" borderRadius="15px">
                                Ada banyak Devisi dari SOCMEDIA, dari mulai Social Media Management,
                                Ads Management, Website & Software Development, Photo & Video Production, Online & Event Handling, Marketplace Optimization, dan lain lain.
                                Kamu bisa mendaftarkan diri melalui SOCJOBS
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left' color={"white"} fontSize={"3xl"}>
                                    Saat ini ada berapa orang yang ada di SOCMEDIA ?
                                </Box>
                                <AccordionIcon  color="white"/>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} color={"black"} fontSize={"2xl"} bgColor="#D9D9D9" borderRadius="15px">
                                Di SOCMEDIA kami terdiri dari beberapa divisi sesuai spesialisasi yang akan menangani kebutuhan kamu,
                                mulai dari Graphic Design, Social Media Specialist, Web Developer, Advertiser, Multimedia, dll, 
                                yang sampai saat ini kami berjumlah lebih dari 25 orang.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Flex>
            </Box>
        <Footer/>
        </>
    )
}

export default ContactUs;