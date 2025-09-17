import { useState } from "react";
import styles from "./LoginForm.module.scss";
import PasswordHidden from "@assets/Auth/PasswordHidden.svg?react";
import CheckMarkFilledIcon from "@assets/General/CheckMarkFilled.svg?react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/App/Routes/Paths";
import { toast } from "react-toastify";

export const LoginForm = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [hidePassword, setHidePassword] = useState(true);

	const fakeUser = {
		email: "admin@prepaire.com",
		password: "PREPAIRE@123",
	};

	const handleLogin = () => {
		if (email === fakeUser.email && password === fakeUser.password) {
			navigate(paths.config.root);
			toast.success("Successfully logged in");
		} else {
			toast.error("Invalid email or password");
		}
	};

	return (
		<div className={styles["Auth-content-form"]}>
			<div className={styles["info"]}>
				<div className={styles["title-description"]}>
					<div className={styles["title"]}>Sign In</div>
					<div className={styles["description"]}>
						Sign in if you already have an account.
					</div>
				</div>
				<div className={styles["inputs-wrapper"]}>
					<div className={styles["email"]}>
						<label htmlFor='email'>Email address</label>
						<input
							type='email'
							placeholder='Email address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={styles["password"]}>
						<label htmlFor='password'>Password</label>
						<div className={styles["password-wrapper"]}>
							<input
								type={hidePassword ? "password" : "text"}
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className={styles["password-hidden"]}>
								<PasswordHidden
									onClick={() => setHidePassword(!hidePassword)}
								/>
							</div>
						</div>
					</div>
					<div className={styles["forgot-password"]}>
						<a href='#'>Forgot password?</a>
					</div>
				</div>
			</div>

			<div className={styles["actions"]}>
				<div className={styles["signup"]}>
					Don’t have an account?{" "}
					<div onClick={() => navigate(paths.auth.register)}>Sign Up</div>
				</div>
				<button
					className={styles["signin"]}
					disabled={!email && !password}
					onClick={handleLogin}
				>
					Sign In <CheckMarkFilledIcon />
				</button>
			</div>
		</div>
	);
};
