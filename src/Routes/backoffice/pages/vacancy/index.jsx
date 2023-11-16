import React, { useState, useEffect } from "react";
import { Flex, Text, Input, Button, Select } from "@chakra-ui/react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { theme } from "../../constants/table";
import api from "../../services/api";
import moment from "moment";
import CustomModal from "../../components/modal";
import { useDisclosure } from "@chakra-ui/react";
import EditModal from "../../components/edit-modal";
import AddNewJobModal from "../../components/add-job-modal";
import { CSVLink } from "react-csv";
import { useToast } from "@chakra-ui/react";

const Page = () => {
	const [content, setContent] = useState();
	const [tableContent, setTableContent] = useState();
	const [filteredContent, setFilteredContent] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isAddModalOpen,
		onOpen: onAddModalOpen,
		onClose: onAddModalClose,
	} = useDisclosure();
	const [detailData, setDetailData] = useState();
	const [experience, setExperience] = useState();
	const [jobType, setJobType] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [dataToExport, setDataToExport] = useState();
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleSetDetail = (item) => setDetailData(item);
	const toast = useToast();

	const COLUMNS = [
		{
			label: "Job Title",
			renderCell: (item) => <Text fontWeight={"500"}>{item.title}</Text>,
			resize: true,
			select: true,
		},
		{
			label: "Experience",
			renderCell: (item) => (
				<Text fontWeight={"500"}>{item.jobExperience?.exp_desc}</Text>
			),
			resize: true,
			select: true,
		},
		{
			label: "Date Start",
			renderCell: (item) => (
				<Text fontWeight={"500"}>
					{moment(item.createdAt).subtract(10, "days").calendar()}
				</Text>
			),
			resize: true,
			select: true,
		},
		{
			label: "Date End",
			renderCell: (item) => (
				<Text fontWeight={"500"}>
					{moment(item.closedAt).subtract(10, "days").calendar()}
				</Text>
			),
			resize: true,
			select: true,
		},

		{
			label: "Type",
			renderCell: (item) => (
				<Text fontWeight={"500"}>{item.jobType?.job_type}</Text>
			),
			resize: true,
			select: true,
		},

		{
			label: "Actions",
			renderCell: (item) => {
				return (
					<Button
						bg={"#44626F"}
						color={"white"}
						_hover={{ background: "blue" }}
						onClick={() => {
							handleSetDetail(item);
							onOpen();
						}}>
						Edit
					</Button>
				);
			},
			resize: true,
		},
	];

	const handleGetAllJob = async () => {
		const response = await api.get(`/job?page=${currentPage}`);

		const nodes = response.data.data.rows;

		setContent(response.data.data);

		setTableContent({ nodes });
		setFilteredContent({ nodes });
		const data = nodes.map((item) => ({
			id: item.id,
			title: item.title,
			job_desc: item.job_desc,
			requirement: item.requirement,
			logo: item.logo,
			quota: item.quota,
			applicant: item.applicant,
			job_type: item.jobType?.job_type,
			job_experience: item.jobExperience?.exp_desc,
			job_position: item.jobPosition?.position_name,
			createdAt: moment(item.createdAt).subtract(10, "days").calendar(),
			closedAt: moment(item.closedAt).subtract(10, "days").calendar(),
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
				(item) => item.jobExperience?.exp_desc === event.target.value
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
					item.jobPosition?.position_name?.toLowerCase() ===
					event.target.value.toLowerCase()
			);
			setFilteredContent({ nodes: filteredData });
		}
	};

	const handleOnChangeStartDate = async (event) => {
		if (event.target.value === "") {
			setStartDate("");
			setFilteredContent(tableContent);
			handleGetAllJob();
			return;
		}

		if (endDate) {
			if (endDate < event.target.value) {
				toast({
					title: "Error",
					description: "The start date is not later than the end date",
					status: "error",
					duration: 2000,
					isClosable: true,
					position: "top-right",
				});
				return;
			}
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

			const nodes = response.data.data.rows;
			setFilteredContent({ nodes });
			setContent(response.data.data);
		}
	};

	const handleOnChangeEndDate = async (event) => {
		if (event.target.value === "") {
			setEndDate("");
			setFilteredContent(tableContent);
			handleGetAllJob();
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
		const response = await api.get("/job/filter/date-range", body);
		const found = response.data.data?.rows.length === 0;

		toast({
			title: response.data.status,
			description: response.data.message,
			status: !found ? "success" : "error",
			duration: 2000,
			isClosable: true,
			position: "top-right",
		});
		const nodes = response.data.data.rows;
		setFilteredContent({ nodes });
		setContent(response.data.data);
	};

	const handleSearchFilter = (event) => {
		if (event.target.value === "") {
			setFilteredContent(tableContent);
		} else {
			const filteredData = tableContent.nodes.filter((item) =>
				item.title.toLowerCase().includes(event.target.value)
			);
			setFilteredContent({ nodes: filteredData });
		}
	};

	useEffect(() => {
		handleGetExperience();
		handleGetJobType();
	}, []);

	useEffect(() => {
		handleGetAllJob();
	}, [currentPage]);

	const headers = [
		{ label: "Job Title", key: "title" },
		{ label: "Job Description", key: "job_desc" },
		{ label: "Job Position", key: "job_position" },
		{ label: "Job Requirement", key: "requirement" },
		{ label: "Job Experience", key: "job_experience" },
		{ label: "Applicant", key: "applicant" },
		{ label: "Closed At", key: "closedAt" },
		{ label: "Created At", key: "createdAt" },
	];

	return (
		<Flex color={"white"} direction={"column"}>
			<Text as={"h1"} fontSize={"2xl"} fontWeight={"500"} mb={2}>
				Job Seeker Information
			</Text>

			<CustomModal isOpen={isOpen} onClose={onClose}>
				{detailData && <EditModal item={detailData} onClose={onClose} />}
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
							filename={`data-job-page-${currentPage}.csv`}
							headers={headers}
							target="_blank"
							separator=";">
							Download Excel
						</CSVLink>
					</Button>
				)}
			</Flex>

			<Button
				my={"30px"}
				color={"white"}
				bg={"green"}
				sx={{
					width: "fit-content",
				}}
				onClick={onAddModalOpen}>
				Tambah
			</Button>

			<CustomModal
				isOpen={isAddModalOpen}
				onClose={onAddModalClose}
				title="Add New Job">
				<AddNewJobModal onClose={onAddModalClose} />
			</CustomModal>

			{content && (
				<Flex direction={"column"} mb={10}>
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
				</Flex>
			)}
		</Flex>
	);
};

export default Page;
