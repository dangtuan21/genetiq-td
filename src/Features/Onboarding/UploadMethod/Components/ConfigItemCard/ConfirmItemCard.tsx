import React, { useState } from "react";
import styles from "./ConfirmCard.module.scss";
import ArrowUpRightIcon from "@assets/General/ArrowUpRight.svg?react";
import { useNavigate } from "react-router-dom";

interface CardItemProps {
	icon: React.ReactNode;
	title: string;
	content: string;
	url?: string;
	disabeld?: boolean;
}

export const ConfigItemCard: React.FC<CardItemProps> = ({
	icon,
	title,
	content,
	url,
	disabeld,
}) => {
	const navigate = useNavigate();
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			className={`${styles["config-item-card"]} ${disabeld ? styles["config-item-card-disabled"] : ""}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => url && navigate(url)}
		>
			<div className={styles["item-card-icon-wrapper"]}>
				<div
					className={`${styles["item-card-icon"]} ${disabeld ? styles["item-card-icon-disabled"] : isHovered ? styles["item-card-icon-hover"] : ""}`}
				>
					{icon}
				</div>
				<ArrowUpRightIcon
					onClick={() => url && navigate(url)}
					style={{ cursor: "pointer" }}
				/>
			</div>
			<div className={styles["item-card-info"]}>
				<div className={styles["item-card-title"]}>{title}</div>
				<div className={styles["item-card-content"]}>{content}</div>
			</div>
		</div>
	);
};
