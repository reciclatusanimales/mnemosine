import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./App.scss";
import store from "./redux/store";

const Root = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
