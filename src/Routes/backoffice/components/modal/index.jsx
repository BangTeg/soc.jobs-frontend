import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	Box,
} from "@chakra-ui/react";

const CustomModal = ({ children, isOpen, onClose, title }) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title ? title : "Detail Application"}</ModalHeader>
					<ModalCloseButton />
					{children}
				</ModalContent>
			</Modal>
		</>
	);
};

export default CustomModal;
