import {
	FormControl,
	FormLabel,
	Input,
	Select,
	Flex,
	Textarea,
	ModalBody,
	ModalFooter,
	Button,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";

const AddNewJobModal = ({ onClose }) => {
	const [position, setPosition] = useState();
	const [experience, setExperience] = useState();
	const [jobType, setJobType] = useState();
	const [jobPayload, setJobPayload] = useState({
		title: "",
		job_desc: "",
		requirement: "",
		logo: null,
		quota: "",
		applicant: 0,
		expId: "",
		typeId: "",
		positionId: "",
		closedAt: "",
	});
	const toast = useToast();

	const handleOnChange = (event) => {
		setJobPayload((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleGetPosition = async () => {
		const response = await api.get("/position");
		setPosition(response.data.data.rows);
	};

	const handleGetExperience = async () => {
		const response = await api.get("/experience");
		setExperience(response.data.data.rows);
	};

	const handleGetJobType = async () => {
		const response = await api.get("/jobType");
		setJobType(response.data.data.rows);
	};

	const handleSubmit = async () => {
		const response = await api.post("/job", jobPayload);
		toast({
			title: response.data.status,
			description: response.data.message,
			status: "success",
			duration: 5000,
			isClosable: true,
			position: "top-right",
		});

		setJobPayload({
			title: "",
			job_desc: "",
			requirement: "",
			logo: null,
			quota: "",
			applicant: 0,
			expId: "",
			typeId: "",
			positionId: "",
			closedAt: "",
		});

		onClose();
	};

	useEffect(() => {
		handleGetPosition();
		handleGetExperience();
		handleGetJobType();
	}, []);

	return (
		<>
			<ModalBody>
				<Flex gap={5} direction={"column"}>
					<FormControl>
						<FormLabel>Job Title</FormLabel>
						<Input
							type="text"
							value={jobPayload.title}
							onChange={handleOnChange}
							name="title"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Quota</FormLabel>
						<Input
							type="number"
							value={jobPayload.quota}
							onChange={handleOnChange}
							name="quota"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Position</FormLabel>
						<Select
							placeholder="Select option"
							onChange={handleOnChange}
							name="positionId">
							{position &&
								position.map((item) => (
									<option key={item.id} value={item.id}>
										{item.position_name}
									</option>
								))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Experience</FormLabel>
						<Select
							placeholder="Select option"
							onChange={handleOnChange}
							name="expId">
							{experience &&
								experience.map((item) => (
									<option key={item.id} value={item.id}>
										{item.exp_desc}
									</option>
								))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Job Type</FormLabel>
						<Select
							placeholder="Select option"
							onChange={handleOnChange}
							name="typeId">
							{jobType &&
								jobType.map((item) => (
									<option key={item.id} value={item.id}>
										{item.job_type}
									</option>
								))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Job Description</FormLabel>
						<Textarea
							placeholder="Job Desc"
							value={jobPayload.job_desc}
							onChange={handleOnChange}
							name="job_desc"></Textarea>
					</FormControl>
					<FormControl>
						<FormLabel>Job Requirement</FormLabel>
						<Textarea
							placeholder="Job Requirement"
							value={jobPayload.requirement}
							onChange={handleOnChange}
							name="requirement"></Textarea>
					</FormControl>
					<FormControl>
						<FormLabel>Closed At</FormLabel>
						<Input
							type="date"
							value={jobPayload.closedAt}
							onChange={handleOnChange}
							name="closedAt"
						/>
					</FormControl>
				</Flex>
			</ModalBody>

			<ModalFooter>
				<Flex>
					<Button colorScheme="green" mr={3} onClick={handleSubmit}>
						Submit
					</Button>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Cancel
					</Button>
				</Flex>
			</ModalFooter>
		</>
	);
};

export default AddNewJobModal;
