import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Navigation.module.scss";

// Importing SVGs as React Components
import DashboardIcon from "@assets/Navbar/Icons/Dashboard.svg?react";
import ReportsIcon from "@assets/Navbar/Icons/Reports.svg?react";
import GoalsIcon from "@assets/Navbar/Icons/Goals.svg?react";
import TestIcon from "@assets/Navbar/Icons/Test.svg?react";

interface NavigationProps {
	onClick?: (selected: string) => void;
}

interface NavButton {
	key: string;
	text: string;
	icon: React.ReactNode;
	translationKey: string;
}

const Navigation: React.FC<NavigationProps> = ({ onClick }) => {
	const { t } = useTranslation();
	const [selected, setSelected] = useState<string>("dashboard");

	const handleClick = (buttonKey: string, buttonText: string) => {
		setSelected(buttonKey);
		if (onClick) {
			onClick(buttonText);
		}
	};

	// Buttons array with correct icons and translation keys
	const buttons: NavButton[] = [
		{
			key: "dashboard",
			text: t("dashboard.title"),
			icon: <DashboardIcon />,
			translationKey: "dashboard.title",
		},
		{
			key: "goals",
			text: t("dashboard.goals"),
			icon: <GoalsIcon />,
			translationKey: "dashboard.goals",
		},
		{
			key: "reports",
			text: t("dashboard.reports"),
			icon: <ReportsIcon />,
			translationKey: "dashboard.reports",
		},
		{
			key: "tests",
			text: t("dashboard.tests"),
			icon: <TestIcon />,
			translationKey: "dashboard.tests",
		},
	];

	return (
		<div className={styles["navigation-container"]}>
			{buttons.map((button) => (
				<button
					key={button.key}
					className={`${selected === button.key ? styles["selected"] : ""}`}
					onClick={() => handleClick(button.key, button.text)}
				>
					<span className={styles.icon}>{button.icon}</span>
					{t(button.translationKey)}
				</button>
			))}
		</div>
	);
};

export default Navigation;
