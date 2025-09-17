import styles from "./SlideA.module.scss";
import ImageA from "@assets/Auth/Login/SlideA.png";

export const SlideA = () => {
	return (
		<div className={styles["Carousel-login-wrapper"]}>
			<div className={styles["Carousel-img-wrapper"]}>
				<img src={ImageA} alt='firts image of the carousel login' />
			</div>
			<div className={styles["Carousel-login-description"]}>
				<h2>Precision Health, Tailored for You</h2>
				<h4>
					Discover your unique genetic risks and get a personalized action plan
					to optimize your well-being.
				</h4>
			</div>
		</div>
	);
};
