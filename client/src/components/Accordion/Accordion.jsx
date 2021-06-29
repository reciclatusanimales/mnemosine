import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";

const AccordionContext = createContext(null);

const useAccordionContext = () => {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error(
			"Accordion components are compound component. Must be used inside Accordion."
		);
	}

	return context;
};

function Collapse({
	element: Component = "div",
	eventKey,
	children,
	...otherProps
}) {
	const { activeEventKey } = useAccordionContext();

	return activeEventKey === eventKey ? (
		<Component {...otherProps}>{children}</Component>
	) : null;
}

const useAccordionClick = (eventKey, onClick) => {
	const { onToggle, activeEventKey } = useAccordionContext();
	console.log(eventKey, activeEventKey);
	return (event) => {
		onToggle(eventKey === activeEventKey ? null : eventKey);

		onClick && onClick(event);
	};
};

function Toggle({
	element: Component = "div",
	eventKey,
	onClick,
	children,
	...otherProps
}) {
	const accordionClick = useAccordionClick(eventKey, onClick);

	return (
		<Component onClick={accordionClick} {...otherProps}>
			{children}
		</Component>
	);
}

const useEventKey = (eventKey, onToggle) => {
	const [activeEventKey, setActiveEventKey] = useState(eventKey);

	useLayoutEffect(() => {
		setActiveEventKey(eventKey);
	}, [eventKey, onToggle]);

	return [activeEventKey, setActiveEventKey];
};

const Accordion = ({
	element: Component = "div",
	activeEventKey,
	onToggle,
	children,
	...otherProps
}) => {
	const [eventKey, setEventKey] = useEventKey(activeEventKey, onToggle);

	const handleToggle = useCallback(
		(eventKey) => {
			if (activeEventKey !== undefined) {
				onToggle(eventKey);
				return;
			}
			setEventKey(eventKey);
		},
		[activeEventKey, onToggle, setEventKey]
	);

	const context = useMemo(() => {
		return {
			activeEventKey: eventKey,
			onToggle: handleToggle,
		};
	}, [eventKey, handleToggle]);

	return (
		<AccordionContext.Provider value={context}>
			<Component {...otherProps}>{children}</Component>
		</AccordionContext.Provider>
	);
};

Accordion.Toggle = Toggle;
Accordion.Collapse = Collapse;

export default Accordion;
