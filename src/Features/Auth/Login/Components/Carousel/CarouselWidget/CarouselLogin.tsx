import styles from "./CarouselLogin.module.scss";
import Logo from "@assets/General/LogoGenetiq-white.svg?react";
import { SlideA } from "./Slides/SlideA/SlideA";

export const CarouselLogin = () => {
	return (
		<div className={styles["Carousel-login-container"]}>
			<Logo />
			<div className={styles["Carousel-slider-wrapper"]}>
				<SlideA />
			</div>
		</div>
	);
};
