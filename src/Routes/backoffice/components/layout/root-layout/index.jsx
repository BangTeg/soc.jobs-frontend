import React from "react";
import { Box, Center, Flex, Image, Input } from "@chakra-ui/react";

import SideBar from "../../sidebar";

import NotifIcon from "../../../assets/icons/notification.svg";

const Page = ({ children }) => {
	return (
		<Center bg={"black"}>
			<Flex sx={{ width: "100%", margin: "0 auto" }}>
				<SideBar />
				<Flex
					direction={"column"}
					w={"100%"}
					px={"50px"}
					mt={"60px"}
					color={"white"}>
					<Box h={"80px"} bg={"black"} w={"100%"}>
						<Flex
							justifyContent={"flex-end"}
							gap={"113px"}
							mb={"41px"}
							sx={{
								position: "fixed",
								right: "60px",
							}}>
							<Flex alignItems={"center"} gap={6}>
								<Flex
									alignItems={"center"}
									justifyContent={"center"}
									bg={"#272829"}
									w={"52px"}
									h={"52px"}
									borderRadius={"3px"}>
									<Image src={NotifIcon} w={6} h={6} alt="notification" />
								</Flex>
								<Box
									bg={"#D9D9D9"}
									w={"41px"}
									h={"41px"}
									borderRadius={"99px"}></Box>
							</Flex>
						</Flex>
					</Box>
					{children}
				</Flex>
			</Flex>
		</Center>
	);
};

export default Page;
