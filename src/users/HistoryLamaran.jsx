import { Box, Wrap, Center, Text, TableContainer, Thead, Tr, Th, Table, Tbody, Td } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from 'axios';  
import moment from "moment/moment";

const HistoryLamaran = () => {

    const [isLogged, setIsLogged] = useState(localStorage.getItem('access_token'));
    const [data, setData] = useState();
    const [id, setUserId] = useState();

    // get api application 
    const handleApplication = async() => {
        if (isLogged) {
            await axios.get(`https://7s81h0b9-4000.asse.devtunnels.ms/user/applications/token`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .then((response) => {
                setData(response.data.data.rows);
                // console.log(response.data.data.rows)
                // console.log(response.data)
            })
            .catch((error) => {
                console.error('Terjadi kesalahan dalam permintaan HTTP:', error);
            });
        }
    }

    useEffect(() => {
        handleApplication();
    }, []);

    //mopmen use for date 
    const formatData = (dateString) => {
        return moment(dateString).format('YYYY-MM-DD');
    }

    // get user id from token 
    return(
        <>
            <Navbar/>
                <Box maxHeight={"-moz-fit-content"} minHeight={"65vh"} bgColor={"#111215"} bgSize={"cover"} paddingTop={"120px"} paddingBottom={"40px"}>
                    <Center>
                        <Wrap bgColor={"#272829"} width={"1300px"} height={"50px"} borderRadius={"10px"}>
                            <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"} textAlign={"left"} paddingLeft={"50px"} paddingTop={"10px"}>Semua Lamaran</Text>
                        </Wrap>
                    </Center>

                    <Center marginTop={"50px"}>
                        <Box bgColor={"#272829"} w="1300px" maxHeight={"-moz-fit-content"} borderRadius="2xl">
                            {data?.length > 0 ? (
                                <TableContainer padding={"30px"}>
                                 <Table borderTopWidth={"1px"}>
                                     <Thead>
                                         <Tr>
                                             <Th color={"white"}>Job</Th>
                                             <Th color={"white"}>Job Title</Th>
                                             <Th color={"white"}>Job Type</Th>
                                             <Th color={"white"}>Tanggal</Th>
                                             <Th color={"white"}>Status</Th>
                                         </Tr>
                                     </Thead>
                                     <Tbody color={"white"} >
                                        {data.map((apply, index) => (
                                        <Tr key={index}>
                                             <Td borderBottomWidth={0}>{apply.Job.jobPosition.position_name}</Td>
                                             <Td borderBottomWidth={0}>{apply.Job.title}</Td>
                                             <Td borderBottomWidth={0}>{apply.Job.jobType.job_type}</Td>
                                             <Td borderBottomWidth={0}>{formatData(apply.createdAt)}</Td>
                                             <Td borderBottomWidth={0}>{apply.status}</Td>
                                         </Tr>
                                        ))}
                                     </Tbody>
                                 </Table>
                             </TableContainer>
                            ) : (
                                <Text marginLeft={"30px"} color={"white"}>Loading... / Or No Application</Text>
                            )};
                        </Box>
                    </Center>
                </Box>
            <Footer/>
        </>
    )
};

export default HistoryLamaran;