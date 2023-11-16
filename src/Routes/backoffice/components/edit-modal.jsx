import {
	FormControl,
	FormLabel,
	Input,
	Select,
	Flex,
	Textarea,
	ModalBody,
	Button,
	ModalFooter,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";

const EditModal = ({ item, onClose }) => {
	const [position, setPosition] = useState();
	const [experience, setExperience] = useState();
	const [jobType, setJobType] = useState();
	const [jobPayload, setJobPayload] = useState({
		title: item.title,
		job_desc: item.job_desc,
		requirement: item.requirement,
		logo: null,
		quota: item.quota,
		applicant: item.applicant,
		expId: item.expId,
		typeId: item.typeId,
		positionId: item.positionId,
		closedAt: item.closedAt,
	});

	const toast = useToast();

	const handleSubmit = async () => {
		const response = await api.put(`/job/${item.id}`, jobPayload);
		toast({
			title: response.data.status,
			description: response.data.message,
			status: "success",
			duration: 5000,
			isClosable: true,
			position: "top-right",
		});
		onClose();
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

	const isValidNumber = (inputString) => {
		const pattern = /^[0-9]+$/;
		return pattern.test(inputString);
	};

	const handleOnChange = (event) => {
		setJobPayload((prev) => ({
			...prev,
			[event.target.name]: isValidNumber(event.target.value)
				? Number(event.target.value)
				: event.target.value,
		}));
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
							type="text"
							value={jobPayload.quota}
							onClick={handleOnChange}
							name="quota"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Position</FormLabel>
						<Select
							placeholder="Select option"
							onClick={handleOnChange}
							name="positionId">
							{item.jobPosition.position_name && (
								<option value={item.positionId} selected>
									{item.jobPosition.position_name}
								</option>
							)}
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
							onClick={handleOnChange}
							name="expId">
							{item.jobExperience.exp_desc && (
								<option value={item.expId} selected>
									{item.jobExperience.exp_desc}
								</option>
							)}
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
							onClick={handleOnChange}
							name="typeId">
							{item.jobType.job_type && (
								<option value={item.typeId} selected>
									{item.jobType.job_type}
								</option>
							)}
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
							onClick={handleOnChange}
							name="job_desc">
							{jobPayload.job_desc}
						</Textarea>
					</FormControl>
					<FormControl>
						<FormLabel>Job Requirement</FormLabel>
						<Textarea
							placeholder="Job Requirement"
							onClick={handleOnChange}
							name="requirement">
							{jobPayload.requirement}
						</Textarea>
					</FormControl>
				</Flex>
			</ModalBody>
			<ModalFooter>
				<Flex>
					<Button colorScheme="green" mr={3} onClick={handleSubmit}>
						Submit
					</Button>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Close
					</Button>
				</Flex>
			</ModalFooter>
		</>
	);
};

export default EditModal;
