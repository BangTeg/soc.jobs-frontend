import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Grid, Text } from "@chakra-ui/react";
import api from "../../services/api";

const Page = () => {
	const [application, setApplication] = useState();
	const [job, setJob] = useState();

	const handleGetApplication = async () => {
		const response = await api.get("/application");
		setApplication(response.data.data);
	};

	const handleGetJob = async () => {
		const response = await api.get("/job");
		setJob(response.data.data);
	};

	useEffect(() => {
		handleGetApplication();
		handleGetJob();
	}, []);

	const dashboardData = [
		{
			name: "Jumlah Pelamar",
			ammount: application?.totalRows,
		},
		{
			name: "Jumlah Lowongan",
			ammount: job?.totalRows,
		},
		{
			name: "Jumlah Diterima",
			ammount: application?.rows?.filter((item) => item.status === "Accepted")
				.length,
		},
	];

	return (
		<Flex direction={"column"} color={"white"}>
			<Text as={"h1"} fontSize={"2xl"} fontWeight={"500"} mb={"30px"}>
				Dashboard
			</Text>
			<Grid templateColumns={"repeat(3, 1fr)"} gap={5}>
				{dashboardData.map((item) => (
					<Box
						key={item.name}
						borderRadius={"10px"}
						border={1}
						borderColor={"#ffffff"}
						borderStyle={"solid"}
						p={6}>
						<Text fontSize={"2xl"} fontWeight={500}>
							{item.name}
						</Text>
						<Center>
							<Text fontSize={"6xl"} fontWeight={700}>
								{item.ammount}
							</Text>
						</Center>
					</Box>
				))}
			</Grid>
		</Flex>
	);
};

export default Page;
