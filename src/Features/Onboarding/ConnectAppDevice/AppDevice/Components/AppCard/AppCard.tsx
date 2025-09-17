import React, { useState } from "react";
import styles from "./AppCard.module.scss";
import { FuselabIcon } from "@/assets/Icons/Fuselab";

interface AppCardProps {
	img: string;
	title: string;
	description: string;
}

export const AppCard: React.FC<AppCardProps> = ({
	img,
	title,
	description,
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	return (
		<div
			className={styles["app-card-container"]}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className={styles["header-wrapper"]}>
				<div className={styles["image-wrapper"]}>
					<img src={img} />
				</div>
				{isHovered && (
					<button className={styles["connect-btn"]}>Coming soon</button>
				)}
			</div>
			<div className={styles["info"]}>
				<div className={styles["title"]}>{title}</div>
				<div className={styles["description"]}>{description}</div>
				{isHovered && (
					<div className={styles["favorite"]}>
						<FuselabIcon fill='rgba(0, 65, 196, 1)' />
					</div>
				)}
			</div>
		</div>
	);
};
