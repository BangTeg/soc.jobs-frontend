import { Heading, Box, Center } from "@chakra-ui/react";
const NotFound = () => {
    return(
        <>
            <Box height="100vh" bg="black">
                <Center>
                    <Heading fontWeight="bold" fontSize="6xl" textColor="#D9D9D9">404 Not Found</Heading>
                </Center>
            </Box>
        </>
    )
}

export default NotFound;