import React from "react";
import { Box, Flex, Text, Image, Link, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "../../assets/icons/dashboard-icon.svg";
import WorkIcon from "../../assets/icons/work-icon.svg";
import LogoutIcon from "../../assets/icons/logout-icon.svg";
import SocIcon from "../../assets/icons/soc-logo.svg";


const sideBarMenus = [
	{
		path: "/backoffice/dashboard",
		icon: DashboardIcon,
		name: "Dashboard",
	},
	{
		path: "/backoffice/waiting-approval",
		icon: WorkIcon,
		name: "Antrean Persetujuan",
	},
	{
		path: "/backoffice/approved",
		icon: WorkIcon,
		name: "Mendapat Persetujuan",
	},
	{
		path: "/backoffice/rejected",
		icon: WorkIcon,
		name: "Tidak Mendapat Persetujuan",
	},
	{
		path: "/backoffice/vacancy",
		icon: WorkIcon,
		name: "All Jobs",
	},
];


const Page = () => {

	const navigate = useNavigate();
	const toast = useToast();
	const { pathname } = useLocation();

		// fungsi for logout
		const handleLogout = () => {
			//hapus token akses dari localstorage
			localStorage.removeItem("access_token");
		
			//redirect ke halaman home 
			setTimeout(() => {
				window.location.href="/";
			}, 1000);
		
			toast({
				title: 'Your Loggin Out', 
				description: 'If you wont to Login clik button on the top right',
				status: 'info',
				duration: 2500,
				isClosable: true,
				position: 'top', 
			});
		}

	return (
		<Box
			sx={{
				width: "500px",
				backgroundColor: "#272829",
				minHeight: "100vh",
				overflow: "hidden",
			}}>
			<Box
				sx={{
					position: "fixed",
					padding: "53px 45px",
					height: "100%",
				}}>
				<Image src={SocIcon} alt="SOC Logo" mb={"8"} />
				<Flex
					direction={"column"}
					justifyContent={"space-between"}
					sx={{
						height: "100%",
					}}>
					<Box>
						{sideBarMenus.map((menu) => (
							<Link key={menu.path} href={menu.path}>
								<Flex
									alignItems={"center"}
									gap={"4"}
									marginBottom={"10"}
									cursor={"pointer"}>
									<Image
										src={menu.icon}
										alt={`${menu.name} icon`}
										w={18}
										h={18}
									/>
									<Text
										as="p"
										color={pathname.includes(menu.path) ? "#3686F7" : "white"}
										fontWeight={pathname.includes(menu.path) ? "700" : "500"}
										fontSize="20px"
										sx={{}}>
										{menu.name}
									</Text>
								</Flex>
							</Link>
						))}
					</Box>
					<Box>
						<Flex alignItems={"center"} gap={"4"} pb={20} cursor={"pointer"}>
							<Image src={LogoutIcon} alt="logout icon" w={18} h={18} />
							<Text as="p" color={"white"} fontWeight={"600"} fontSize="20px" onClick={handleLogout}>
								Logout
							</Text>
						</Flex>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};

export default Page;
