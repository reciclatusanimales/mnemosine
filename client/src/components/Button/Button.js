import "./button.scss";
import Spinner from "../Spinner";

const Button = ({ children, isLoading, showSpinner = true, ...otherProps }) => {
	return (
		<button className="button" {...otherProps} disabled={isLoading}>
			{isLoading && showSpinner ? <Spinner /> : children}
		</button>
	);
};

export default Button;
