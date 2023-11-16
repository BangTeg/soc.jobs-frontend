import {
	FormControl,
	FormLabel,
	Input,
	Flex,
	Textarea,
	ModalBody,
	ModalFooter,
	Button,
	useToast,
	Link,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";

const DetailApplicationModal = ({ onClose, item }) => {
	const userId = item.User.id;
	const jobId = item.jobId;
	const applicantionId = item.id;
	const [data, setData] = useState();
	const [job, setJob] = useState();
	const toast = useToast();
	const [cv, setCv] = useState();
	
	const handleGetUserData = async () => {
		const response = await api.get(`/user/profile/${userId}`);

		setData(response.data?.data);
	};

	const handleGetJobDetail = async () => {
		try {
			const response = await api.get(`/job/${jobId}`);

			setJob(response.data.data);
		} catch (error) {
			toast({
				title: error.response.data.status,
				description: error.response.data.message,
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
			return;
		}
	};

	const handleGetCv = async () => {
		try {
			const response = await api.get(`/user/cv/${userId}`);

			setCv(response.data.cv);
			// console.log(response)
		} catch (error) {
			return;
		}
	};

	const handleAcceptApplication = async () => {
		try {
			const body = {
				status: "Accepted",
			};

			const response = await api.put(`/application/${applicantionId}`, body);

			toast({
				title: response.data.status,
				description: response.data.message,
				status: "success",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
		} catch (error) {
			toast({
				title: error.response.data.status,
				description: error.response.data.message,
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
		}

		onClose();
	};

	const handleRejectApplication = async () => {
		try {
			const body = {
				status: "Rejected",
			};

			const response = await api.put(`/application/${applicantionId}`, body);

			toast({
				title: response.data.data.status,
				description: response.data.data.message,
				status: "success",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
		} catch (error) {
			toast({
				title: error.response.data.status,
				description: error.response.data.message,
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
		}

		onClose();
	};

	useEffect(() => {
		handleGetUserData();
		handleGetJobDetail();
		handleGetCv();
	}, []);

	return (
		<>
			<ModalBody>
				<Text as={"h1"}>Applicant's personal data</Text>
				<Flex gap={5} mt={4}>
					<Flex direction={"column"} gap={4} flex={1}>
						<FormControl>
							<FormLabel>Nama</FormLabel>
							<Input type="text" value={data?.name} disabled />
						</FormControl>
						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input type="text" value={data?.email} disabled />
						</FormControl>
						<FormControl>
							<FormLabel>Gender</FormLabel>
							<Input type="text" value={data?.gender} disabled />
						</FormControl>
						<FormControl>
							<FormLabel>No Hp</FormLabel>
							<Input type="text" value={data?.contact} disabled />
						</FormControl>
					</Flex>
					<Flex direction={"column"} gap={4} flex={1}>
						<FormControl>
							<FormLabel>Alamat</FormLabel>
							<Textarea disabled value={data?.address}></Textarea>
						</FormControl>
						<FormControl>
							<FormLabel>Mendaftar</FormLabel>
							<Input
								type="text"
								value={item.Job.jobPosition.position_name}
								disabled
							/>
						</FormControl>
						<FormControl>
							<FormLabel>CV</FormLabel>
							<Link href={cv} target="_blank">
								Download CV
							</Link>
						</FormControl>
					</Flex>
				</Flex>
				{job && (
					<FormControl mt={4}>
						<FormLabel>Info Job</FormLabel>
						<Textarea disabled value={job?.job_desc}></Textarea>
					</FormControl>
				)}
			</ModalBody>

			<ModalFooter>
				<Flex>
					<Button
						isDisabled={
							(item.status === "Rejected") | (item.status === "Accepted")
						}
						colorScheme="green"
						mr={3}
						onClick={handleAcceptApplication}>
						Accept
					</Button>
					<Button
						isDisabled={
							(item.status === "Rejected") | (item.status === "Accepted")
						}
						colorScheme="red"
						mr={3}
						onClick={handleRejectApplication}>
						Reject
					</Button>
				</Flex>
			</ModalFooter>
		</>
	);
};

export default DetailApplicationModal;
