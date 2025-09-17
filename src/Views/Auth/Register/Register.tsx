import { RegisterForm } from "@/Features/Auth/Resgister/RegisterForm/RegisterForm";
import { CarouselRegister } from "@/Features/Auth/Resgister/Carousel/CarouselWidget/CarouselRegister";
import styles from "./Register.module.scss";

const Register = () => {
	return (
		<div className={styles["Auth-layout"]}>
			<div className={styles["Auth-content"]}>
				<div className={styles["Auth-content-left"]}>
					<CarouselRegister />
				</div>
				<div className={styles["Auth-content-right"]}>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
};

export default Register;
