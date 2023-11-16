import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Tr,
	Flex,
	Text,
	ModalBody,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import React from "react";

const DetailApplication = ({ item, onClose }) => {
	return (
		<>
			<ModalBody>
				<TableContainer>
					<Table variant="simple">
						<Tbody>
							{item &&
								Object.entries(item).map(([key, value]) => (
									<Tr key={key}>
										<Td
											sx={{
												textTransform: "capitalize",
											}}>
											{key}
										</Td>
										<Td>
											{typeof value === "object"
												? Object.entries(value).map(([key, val]) => (
														<Flex direction={"column"} key={key}>
															<Text as={"p"}>
																{typeof val === "object"
																	? Object.entries(val).map(([k, v]) => v)
																	: val}
															</Text>
														</Flex>
												  ))
												: value}
										</Td>
									</Tr>
								))}
						</Tbody>
					</Table>
				</TableContainer>
			</ModalBody>
			<ModalFooter>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalFooter>
		</>
	);
};

export default DetailApplication;
