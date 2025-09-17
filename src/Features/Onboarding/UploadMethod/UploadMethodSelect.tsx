import { ConfigItemCard } from "./Components/ConfigItemCard/ConfirmItemCard";
import styles from "./UploadMethod.module.scss";
import React from "react";
// import ArrowUpRightIcon from "@assets/General/ArrowUpRight.svg?react";
import QueryIcon from "@assets/General/Query.svg?react";
import UploadCloudIcon from "@assets/General/UploadCloud.svg?react";
import ShoppingCartPlusIcon from "@assets/General/ShoppingCartPlus.svg?react";
import AppsIcon from "@assets/General/Apps.svg?react";
import { paths } from "@/App/Routes/Paths";

export const UploadMethodSelect = () => {
	interface CardItem {
		icon: React.ReactNode;
		title: string;
		content: string;
		url?: string;
		disabeld?: boolean;
	}
	const cardItems: CardItem[] = [
		{
			icon: <QueryIcon />,
			title: "Take quiz",
			content:
				"Answer a few quick questions to receive a personalised health plan tailored to your needs.",
			disabeld: true,
		},
		{
			icon: <ShoppingCartPlusIcon />,
			title: "Buy Supplements, Peptides, & Diagnostic Tests",
			content:
				" Order custom-formulated supplements designed specifically for your health goals and genetic profile.",
			disabeld: true,
		},
		{
			icon: <UploadCloudIcon />,
			title: "Upload files",
			content:
				"Securely upload your test results to get precise recommendations based on your medical history.",
			url: paths.config.importOrUpload,
		},

		{
			icon: <AppsIcon />,
			title: "Connect a device app",
			content:
				"Sync your favorite health tracking apps and devices for real-time insights and better health monitoring.",
			url: paths.config.connectApp,
		},
	];

	return (
		<div className={styles["config-items-wrapper"]}>
			{cardItems.map((card) => (
				<ConfigItemCard key={card.title} {...card} />
			))}
		</div>
	);
};
