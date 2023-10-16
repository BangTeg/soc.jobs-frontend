import Navbar  from "../../components/Navbar";
import React from "react";
import Footer  from "../../components/Footer";
import { Box, Heading } from "@chakra-ui/react";
import "../../styles/All.css";

const DigitalADSFL = () => { 

    return(
        <>
        <Navbar/>
            <Box className="fullTimeJobsType">
                <Heading textColor="white" paddingTop="10%">
                    DIGITAL ADS
                </Heading>
            </Box>
        <Footer/>
        </>
    )
}

export default DigitalADSFL;