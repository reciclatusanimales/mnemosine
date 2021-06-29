import { useCallback, useState } from "react";

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = useCallback(() => setIsOpen(false), []);
	const openModal = useCallback(() => setIsOpen(true), []);
	const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

	return {
		isOpen,
		toggle,
		closeModal,
		openModal,
	};
};

export default useModal;
