import styles from "./CarouselRegister.module.scss";
import Logo from "@assets/General/LogoGenetiq-white.svg?react";
import { SlideA } from "./Slides/SlideA/SlideA";

export const CarouselRegister = () => {
	return (
		<div className={styles["Carousel-register-container"]}>
			<Logo />
			<div className={styles["Carousel-slider-wrapper"]}>
				<SlideA />
			</div>
		</div>
	);
};
