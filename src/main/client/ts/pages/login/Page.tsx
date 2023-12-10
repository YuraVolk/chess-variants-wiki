import React from "react";
import { createRoot } from "react-dom/client";
import { assertNonUndefined } from "../../baseTypes";
import "../../../scss/Global.scss";
import "../../../scss/Normalize.scss";
import "../../../scss/pages/AuthenticationPage.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { LoginForm } from "@components/Authentication/LoginForm";

const Main = () => {
	return (
		<div id="main">
			<ToastContainer />
			<LoginForm />
		</div>
	);
};

const mountPoint = document.getElementById("react-mountpoint");
assertNonUndefined(mountPoint);
createRoot(mountPoint).render(<Main />);
