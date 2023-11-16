import React, { useState, useEffect } from "react";
import {
	Flex,
	Text,
	Input,
	Button,
	Box,
	Select,
	useToast,
} from "@chakra-ui/react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { theme } from "../../constants/table";
import api from "../../services/api";
import moment from "moment";
import CustomModal from "../../components/modal";
import { useDisclosure } from "@chakra-ui/react";
import DetailApplicationModal from "../../components/detail-application";
import { CSVLink } from "react-csv";

const Page = () => {
	const [content, setContent] = useState();
	const [tableContent, setTableContent] = useState();
	const [detailData, setDetailData] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [experience, setExperience] = useState();
	const [jobType, setJobType] = useState();
	const [filteredContent, setFilteredContent] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [dataToExport, setDataToExport] = useState();
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleSetDetail = (item) => setDetailData(item);
	const toast = useToast();

	const COLUMNS = [
		{
			label: "Nama",
			renderCell: (item) => <Text fontWeight={"500"}>{item.User.name}</Text>,
			resize: true,
			select: true,
		},
		{
			label: "Job Title",
			renderCell: (item) => <Text fontWeight={"500"}>{item.Job.title}</Text>,
			resize: true,
			select: true,
		},
		{
			label: "Job Type",
			renderCell: (item) => (
				<Text fontWeight={"500"}>{item.Job.jobType.job_type}</Text>
			),
			resize: true,
			select: true,
		},
		{
			label: "Date",
			renderCell: (item) => (
				<Text fontWeight={"500"}>
					{moment(item.createdAt).subtract(10, "days").calendar()}
				</Text>
			),
			resize: true,
			select: true,
		},
		{
			label: "Status",
			renderCell: (item) => <Text fontWeight={"500"}>{item.status}</Text>,
			resize: true,
			select: true,
		},
		{
			label: "Actions",
			renderCell: (item) => {
				return (
					<Button
						bg={"#FF6610"}
						color={"white"}
						onClick={() => {
							handleSetDetail(item);
							onOpen();
						}}>
						Detail
					</Button>
				);
			},
			resize: true,
		},
	];

	const handleGetApprovedJob = async () => {
		const response = await api.get(`/application?page=${currentPage}`);

		const nodes = response.data.data.rows.filter(
			(item) => item.status === "Accepted"
		);

		setContent(response.data.data);
		setTableContent({ nodes });
		setFilteredContent({ nodes });

		const data = nodes.map((item) => ({
			nama_applicant: item.User?.name,
			status: item.status,
			job_title: item.Job?.title,
			job_position: item.Job?.jobPosition?.position_name,
			job_experience: item.Job?.jobExperience?.exp_desc,
		}));

		setDataToExport(data);
	};

	const handleGetExperience = async () => {
		const response = await api.get("/experience");
		setExperience(response.data.data.rows);
	};

	const handleGetJobType = async () => {
		const response = await api.get("/position");
		setJobType(response.data.data.rows);
	};

	const handleOnChangeExperienceFilter = (event) => {
		if (event.target.value === "all") {
			setFilteredContent(tableContent);
		} else {
			const filteredData = tableContent.nodes.filter(
				(item) => item.Job.jobExperience?.exp_desc === event.target.value
			);
			setFilteredContent({ nodes: filteredData });
		}
	};

	const handleOnChangeJobFilter = (event) => {
		if (event.target.value === "all") {
			setFilteredContent(tableContent);
		} else {
			const filteredData = tableContent.nodes.filter(
				(item) =>
					item.Job?.jobPosition.position_name.toLowerCase() ===
					event.target.value.toLowerCase()
			);
			setFilteredContent({ nodes: filteredData });
		}
	};

	const handleOnChangeStartDate = async (event) => {
		if (event.target.value === "") {
			setStartDate("");
			setFilteredContent(tableContent);
			handleGetApprovedJob();
			return;
		}

		setStartDate(event.target.value);

		if (endDate) {
			const body = {
				params: {
					startDate,
					endDate,
				},
			};
			const response = await api.get("/application/filter/date-range", body);
			const found = response.data.data?.rows.length === 0;

			toast({
				title: response.data.status,
				description: response.data.message,
				status: found ? "error" : "success",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});

			const nodes = response.data.data.rows.filter(
				(item) => item.status === "Accepted"
			);

			setFilteredContent({ nodes });
			setContent(response.data.data);
		}
	};

	const handleOnChangeEndDate = async (event) => {
		if (event.target.value === "") {
			setEndDate("");
			setFilteredContent(tableContent);
			handleGetApprovedJob();
			return;
		}

		if (startDate > event.target.value) {
			toast({
				title: "Error",
				description: "The end date is not later than the start date",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
			return;
		}
		setEndDate(event.target.value);
		const body = {
			params: {
				startDate,
				endDate: event.target.value,
			},
		};
		const response = await api.get("/application/filter/date-range", body);
		const found = response.data.data?.rows.length === 0;

		toast({
			title: response.data.status,
			description: response.data.message,
			status: !found ? "success" : "error",
			duration: 2000,
			isClosable: true,
			position: "top-right",
		});
		const nodes = response.data.data.rows.filter(
			(item) => item.status === "Accepted"
		);

		setFilteredContent({ nodes });
		setContent(response.data.data);
	};

	const handleSearchFilter = (event) => {
		if (event.target.value === "") {
			setFilteredContent(tableContent);
		} else {
			const filteredData = tableContent.nodes.filter((item) =>
				item.Job.title.toLowerCase().includes(event.target.value)
			);
			setFilteredContent({ nodes: filteredData });
		}
	};

	useEffect(() => {
		handleGetApprovedJob();
		handleGetExperience();
		handleGetJobType();
	}, []);

	useEffect(() => {
		handleGetApprovedJob();
	}, [currentPage]);

	const headers = [
		{ label: "Nama Applicant", key: "nama_applicant" },
		{ label: "Status", key: "status" },
		{ label: "Job Title", key: "job_title" },
		{ label: "Job Position", key: "job_position" },
		{ label: "Job Experience", key: "job_experience" },
	];

	return (
		<Flex color={"white"} direction={"column"}>
			<Text as={"h1"} fontSize={"2xl"} fontWeight={"500"} mb={2}>
				Job Seeker Information
			</Text>

			<CustomModal isOpen={isOpen} onClose={onClose}>
				{detailData && (
					<DetailApplicationModal item={detailData} onClose={onClose} />
				)}
			</CustomModal>

			<Flex gap={5} alignItems={"end"}>
				<Flex direction={"column"} gap={4} w={"350px"}>
					<Text
						as={"p"}
						sx={{
							textTransform: "capitalize",
						}}>
						Search
					</Text>
					<Input
						w={"full"}
						placeholder="Search"
						bg={"white"}
						color={"black"}
						onChange={handleSearchFilter}
					/>
				</Flex>
				<Flex direction={"column"} gap={4}>
					<Text
						as={"p"}
						sx={{
							textTransform: "capitalize",
						}}>
						Experience
					</Text>
					<Select
						bg={"white"}
						color={"black"}
						placeholder="Select option"
						onChange={handleOnChangeExperienceFilter}>
						<option value="all" selected style={{ color: "black" }}>
							All
						</option>
						{experience &&
							experience.map((item) => (
								<option
									key={item.id}
									value={item.exp_desc}
									style={{ color: "black" }}>
									{item.exp_desc}
								</option>
							))}
					</Select>
				</Flex>

				<Flex direction={"column"} gap={4}>
					<Text
						as={"p"}
						sx={{
							textTransform: "capitalize",
						}}>
						Job
					</Text>
					<Select
						bg={"white"}
						color={"black"}
						placeholder="Select option"
						onChange={handleOnChangeJobFilter}>
						<option value="all" selected style={{ color: "black" }}>
							All
						</option>
						{jobType &&
							jobType.map((item) => (
								<option
									key={item.id}
									value={item.position_name}
									style={{ color: "black" }}>
									{item.position_name}
								</option>
							))}
					</Select>
				</Flex>

				<Flex direction={"column"} gap={4}>
					<Text
						as={"p"}
						sx={{
							textTransform: "capitalize",
						}}>
						Start Date
					</Text>
					<Input
						bg={"white"}
						color={"black"}
						type="date"
						value={startDate}
						onChange={handleOnChangeStartDate}
					/>
				</Flex>
				<Flex direction={"column"} gap={4}>
					<Text
						as={"p"}
						sx={{
							textTransform: "capitalize",
						}}>
						End Date
					</Text>
					<Input
						bg={"white"}
						color={"black"}
						type="date"
						value={endDate}
						onChange={handleOnChangeEndDate}
					/>
				</Flex>
				{dataToExport && (
					<Button variant={"outline"} color={"red"} colorScheme="red">
						<CSVLink
							data={dataToExport}
							filename={`data-accepted-applicant-${currentPage}.csv`}
							headers={headers}
							target="_blank"
							separator=";">
							Download Excel
						</CSVLink>
					</Button>
				)}
			</Flex>

			{content && (
				<Box mt={"30px"}>
					<CompactTable
						columns={COLUMNS}
						data={filteredContent}
						theme={theme}
						layout={{ custom: true }}
					/>
					{content && (
						<Flex justifyContent={"space-between"} alignItems={"center"} mt={4}>
							<p>Current Page : {content.currentPage}</p>
							<Flex alignItems={"center"}>
								<Text as={"p"} mr={4}>
									Page
								</Text>
								<Flex gap={3}>
									{Array.from({ length: content.totalPages }).map((_, idx) => (
										<Button
											bg={idx + 1 === currentPage ? "blue" : "gray"}
											color={"white"}
											key={idx}
											onClick={() => setCurrentPage(idx + 1)}>
											{idx + 1}
										</Button>
									))}
								</Flex>
							</Flex>
						</Flex>
					)}
				</Box>
			)}
		</Flex>
	);
};

export default Page;
