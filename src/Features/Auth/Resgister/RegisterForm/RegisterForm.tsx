import { useState } from "react";
import styles from "./RegisterForm.module.scss";
import PasswordHidden from "@assets/Auth/PasswordHidden.svg?react";
import InformationIcon from "@assets/General/Information.svg?react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/App/Routes/Paths";
import CalendarIcon from "@assets/General/Calendar.svg?react";
import { CheckMarkFilledIcon } from "@/assets/Icons/CheckMark";

export const RegisterForm = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [fullName, setFullName] = useState<string>("");
	const [dob, setDOB] = useState<string>("");
	const [height, setHeight] = useState<number>(60);
	const [weight, setWeight] = useState<number>(60);
	const [hidePassword, setHidePassword] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
	const [checked, setChecked] = useState<boolean>(false);
	const navigate = useNavigate();

	return (
		<div className={styles["Auth-content-form"]}>
			<div className={styles["info"]}>
				<div className={styles["title-description"]}>
					<div className={styles["title"]}>Create Account</div>
					<div className={styles["description"]}>
						Ready, Set, Connect: Register for Your Account Instantly!
					</div>
				</div>
				<div className={styles["inputs-wrapper"]}>
					<div className={styles["category"]}>Authenticaion details</div>
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
						<span className={styles["password-notify"]}>
							<InformationIcon /> Choose a password with at least 8 characters.
						</span>
					</div>
					<div className={styles["password"]}>
						<label htmlFor='password'>Confirm password</label>
						<div className={styles["password-wrapper"]}>
							<input
								type={hideConfirmPassword ? "password" : "text"}
								placeholder='Confirm password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<div className={styles["password-hidden"]}>
								<PasswordHidden
									onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={styles["inputs-wrapper"]}>
					<div className={styles["category"]}>
						Help us get you known better{" "}
						<span className={styles["optional"]}>(Optional)</span>
					</div>
					<div className={styles["name-wrapper"]}>
						<div className={styles["full-name"]}>
							<label htmlFor='Full name'>Full name</label>
							<input
								type='text'
								placeholder='Full name'
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
							/>
						</div>
						<div className={styles["date-birth"]}>
							<label htmlFor='DOB'>Date of birth</label>
							<div className={styles["dob-wrapper"]}>
								<input
									type='text'
									placeholder='01.01.1970'
									value={dob}
									onChange={(e) => setDOB(e.target.value)}
								/>
								<div className={styles["calendar"]}>
									<CalendarIcon
										onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className={styles["character"]}>
						<div className={styles["height"]}>
							<label htmlFor='height'>Height</label>
							<div className={styles["height-wrapper"]}>
								<input
									type='number'
									placeholder='68'
									value={height}
									onChange={(e) => setHeight(Number(e.target.value))}
								/>
							</div>
						</div>
						<div className={styles["weight"]}>
							<label htmlFor='weight'>Weight</label>
							<div className={styles["weight-wrapper"]}>
								<input
									type='number'
									placeholder='162'
									value={weight}
									onChange={(e) => setWeight(Number(e.target.value))}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles["actions"]}>
				<div className={styles["agreement"]}>
					<div className={styles["checkbox"]}>
						<input
							type='checkbox'
							className={styles["check-agreement"]}
							onChange={() => setChecked(!checked)}
						/>
					</div>
					<div className={styles["title"]}>
						I read and agree to Terms and Conditions and Privacy Policy.
					</div>
				</div>
				<div className={styles["btns"]}>
					<div className={styles["signin"]}>
						Already have an account?
						<div onClick={() => navigate(paths.auth.login)}>Sign In</div>
					</div>
					<button
						className={`${styles["signup"]} ${!checked ? styles["signup-disabled"] : ""}`}
						disabled={!email && !password}
						onClick={() => {}}
					>
						Sign Up <CheckMarkFilledIcon fill={checked ? "white" : "#8F95A0"} />
					</button>
				</div>
			</div>
		</div>
	);
};
