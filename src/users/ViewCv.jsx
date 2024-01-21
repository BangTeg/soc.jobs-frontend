import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from 'axios';  
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const ViewCv = () => {

    const [isLogged, setIsLogged] = useState(localStorage.getItem('access_token'));
    const [pdfUrl, setPdfUrl] = useState(null);

    // console.log(isLogged);

    // get cv functions fetch

    const handleCv = async() => {
        
        if (isLogged) {
            try{
                await axios.get("https://7s81h0b9-4000.asse.devtunnels.ms/user/cv", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                .then((response) => {
                    const blob = new Blob([response.data], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    setPdfUrl(url);
                    // console.log(response);
                    // console.log(url);
                })
            }
            catch(error) {
                console.error('Terjadi kesalahan dalam permintaan HTTP:', error);
            }
        }
    };

    useEffect(() => {
        handleCv()
    }, []);

    return(
        <>
        <Navbar/>
           <Box height={"100vh"}  bgSize="cover" bgColor="#111215" paddingTop={"8%"}> 
                <Box width={"50%"} height={"90%"} marginLeft={"5%"} borderRadius={"20px"}>
                    {pdfUrl && (
                        <Document
                            file={pdfUrl}
                            options={{ workerSrc: '/pdf.worker.js', cMapUrl: 'cmaps/', cMapPacked: true }}>
                            <Page pageNumber={1} />
                        </Document>
                    )}
                </Box>
           </Box>
        <Footer/>
        </>
    );
};

export default ViewCv;