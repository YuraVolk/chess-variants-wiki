import React, { useState } from "react";
import styles from "./FormStyles.module.scss";
import { toast } from "react-toastify";
import { defaultToastSettings } from "@client/ts/services/Toast";

export const SignUpForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCopy, setPasswordCopy] = useState("");
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

		if (!email) {
			toast("The email must not be empty.", {
				...defaultToastSettings,
				type: "error"
			});
			return;
		}

		if (!password || !passwordCopy) {
			toast("The password must not be empty.", {
				...defaultToastSettings,
				type: "error"
			});
			return;
		}

		if (password !== passwordCopy) {
			toast("The passwords must match.", {
				...defaultToastSettings,
				type: "error"
			});
			return;
		}

		setFormSubmitting(true);
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			redirect: "follow",
			credentials: "same-origin",
			body: JSON.stringify({
				username,
				password,
				email
			})
		});

		if (response.ok) {
			toast("The account was successfully created! Follow the verification link sent to your email.", {
				...defaultToastSettings,
				type: "success"
			});
		} else {
			const text = await response.text();
			toast("New user creation error: " + text, {
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
					toast("New user creation error: " + String(e), {
						...defaultToastSettings,
						type: "error"
					});
                    setFormSubmitting(false);
				});
			}}>
			<h1 className={styles.form__heading}>Create an Account</h1>
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
				Email:
				<input type="email" className={styles.form__input} value={email} required onChange={(e) => setEmail(e.target.value)} />
			</label>
			<div className={styles.form__passwords}>
				<label className={styles.form__label}>
					Password:
					<input
						type="password"
						className={styles.form__input}
						value={password}
						autoComplete="new-password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<label className={styles.form__label}>
					Confirm password:
					<input
						type="password"
						className={styles.form__input}
						value={passwordCopy}
						autoComplete="new-password"
						required
						onChange={(e) => setPasswordCopy(e.target.value)}
					/>
				</label>
			</div>
			<button type="submit" className={styles.form__button}>
				Sign Up
			</button>
			<a className={styles["form__muted-text"]} href="/login">
				Already have an account?
			</a>
			<span className={styles["form__muted-text"]}>Chess Variants Wiki</span>
		</form>
	);
};
