import React, { useState } from "react";
import styles from "./FormStyles.module.scss";
import { toast } from "react-toastify";
import { defaultToastSettings } from "@client/ts/services/Toast";

export const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isFormSubmitting, setFormSubmitting] = useState(false);

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isFormSubmitting) return;

		if (!username) {
			toast("The username must not be empty.", {
				...defaultToastSettings,
				type: "error"
			});
			return;
		}

		if (!password) {
			toast("The password must not be empty.", {
				...defaultToastSettings,
				type: "error"
			});
			return;
		}

		setFormSubmitting(true);
		const response = await fetch("/api/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			redirect: "follow",
			credentials: "same-origin",
			body: JSON.stringify({
				username,
				password
			})
		});

		if (response.ok) {
			toast("You have successfully logged in your account!", {
				...defaultToastSettings,
				type: "success"
			});
		} else {
			const text = await response.text();
			toast("Login error: " + text, {
				...defaultToastSettings,
				type: "error"
			});
		}
		setFormSubmitting(false);
	};

	return (
		<form
			className={`${styles.form} ${isFormSubmitting ? styles["form--disabled"] : ""}`}
			onSubmit={(e) => {
				onFormSubmit(e).catch((e) => {
					toast("Login error: " + String(e), {
						...defaultToastSettings,
						type: "error"
					});
					setFormSubmitting(false);
				});
			}}>
			<h1 className={styles.form__heading}>Sign In an Account</h1>
			<label className={`${styles.form__label} ${styles["form__label--large"]}`}>
				Username:
				<input
					type="text"
					className={styles.form__input}
					value={username}
					required
					autoComplete="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
			<label className={`${styles.form__label} ${styles["form__label--large"]}`}>
				Password:
				<input
					type="password"
					className={styles.form__input}
					value={password}
					autoComplete="password"
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<button type="submit" className={styles.form__button}>
				Log in
			</button>
			<a className={styles["form__muted-text"]} href="/sign-up">
				Do not have an account?
			</a>
			<span className={styles["form__muted-text"]}>Chess Variants Wiki</span>
		</form>
	);
};
