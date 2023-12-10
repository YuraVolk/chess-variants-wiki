import React from "react";
import { createRoot } from "react-dom/client";
import { assertNonUndefined } from "../../baseTypes";
import { SignUpForm } from "@components/Authentication/SignUpForm";
import "../../../scss/Global.scss";
import "../../../scss/Normalize.scss";
import "../../../scss/pages/AuthenticationPage.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Main = () => {
	return (
		<div id="main">
			<ToastContainer />
			<SignUpForm />
		</div>
	);
};

const mountPoint = document.getElementById("react-mountpoint");
assertNonUndefined(mountPoint);
createRoot(mountPoint).render(<Main />);
