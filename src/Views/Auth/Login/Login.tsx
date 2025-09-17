import styles from "./Login.module.scss";

import { CarouselLogin } from "@/Features/Auth/Login/Components/Carousel/CarouselWidget/CarouselLogin";
import { LoginForm } from "@/Features/Auth/Login/Components/LoginForm/LoginForm";

const Login = () => {
	return (
		<div className={styles["Auth-layout"]}>
			<div className={styles["Auth-content"]}>
				<div className={styles["Auth-content-left"]}>
					<CarouselLogin />
				</div>
				<div className={styles["Auth-content-right"]}>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
