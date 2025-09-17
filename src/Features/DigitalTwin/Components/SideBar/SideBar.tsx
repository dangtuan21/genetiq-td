import styles from "./SideBar.module.scss";

import AlergyIcon from "@assets/SideBar/Icons/allergy.svg?react";
import CardioLoadIcon from "@assets/SideBar/Icons/heart.svg?react";
import ClinicalNotesIcon from "@assets/SideBar/Icons/default.svg?react";
import EndocrinologyIcon from "@assets/SideBar/Icons/Neck.svg?react";
import GastroenterolgyIcon from "@assets/SideBar/Icons/Lungs.svg?react";
import GynecologyIcon from "@assets/SideBar/Icons/gynecology.svg?react";
import HematologyIcon from "@assets/SideBar/Icons/hematology.svg?react";
import NephrologyIcon from "@assets/SideBar/Icons/nephrology.svg?react";
import OxygenSaturationIcon from "@assets/SideBar/Icons/oxygen_saturation.svg?react";
import Pulmonology1Icon from "@assets/SideBar/Icons/Kindeys.svg?react";
import PulmonologyIcon from "@assets/SideBar/Icons/Stomach.svg?react";
import HeadIcon from "@assets/SideBar/Icons/head.svg?react";
import UlnaRadiusAltIcon from "@assets/SideBar/Icons/ulna_radius_alt.svg?react";
import UrologyIcon from "@assets/SideBar/Icons/urology.svg?react";
import IconButton from "./Components/IconButton/IconButton";
import Dropdown from "../../Dropdown/Dropdown";
import { useDispatch } from "react-redux";
import { setCategory } from "@/App/Redux/categorySlice";
import React, { useEffect } from "react";

type DropdownValue = "total" | "cardio";

interface SideBarProps {
	onModelChange: (
		type: "body" | "cardio",
		cameraConfig: {
			position: [number, number, number];
			zoom: number;
		},
	) => void;
	modelType?: "body" | "cardio";
}

const SideBar = ({ onModelChange, modelType = "body" }: SideBarProps) => {
	const dispatch = useDispatch();

	const [activeButton, setActiveButton] =
		React.useState<string>("ClinicalNotes");
	const [dropdownValue, setDropdownValue] =
		React.useState<DropdownValue>("total");

	useEffect(() => {
		if (modelType === "cardio") {
			setActiveButton("CardioLoad");
			setDropdownValue("cardio");
			handleCategoryChange("cardiovascular");
		}
	}, [modelType]);

	const handleCategoryChange = (category: string) => {
		dispatch(setCategory(category));
	};

	const zoomConfigs: Record<
		string,
		{
			position: [number, number, number];
			zoom: number;
		}
	> = {
		ClinicalNotes: { position: [0, 9, 200], zoom: 10.5 },
		StressManagement: { position: [0, 30, 200], zoom: 40 },
		CardioLoad: { position: [0, 20, 200], zoom: 15 },
		Pulmonology: { position: [0, 10, 200], zoom: 43 },
		Gastroenterolgy: { position: [0, 7, 200], zoom: 45 },
		Endocrinology: { position: [0, 25, 200], zoom: 45 },
		Pulmonology1: { position: [0, -15, 200], zoom: 17 },
	};

	const handleZoom = (bodyPart: string) => {
		if (activeButton === bodyPart) {
			return;
		}

		setActiveButton(bodyPart);
		const config = zoomConfigs[bodyPart];

		if (config) {
			if (bodyPart === "CardioLoad") {
				handleCategoryChange("cardiovascular");
				onModelChange("cardio", config);
			} else {
				handleCategoryChange("total");
				onModelChange("body", config);
			}
		}
	};

	const handleDropdownChange = (value: DropdownValue) => {
		// If selecting the same value, do nothing
		if (value === dropdownValue) {
			return;
		}

		setDropdownValue(value);
		if (value === "total") {
			handleZoom("ClinicalNotes");
		} else if (value === "cardio") {
			handleZoom("CardioLoad");
		}
	};

	const buttons = [
		{ text: "ClinicalNotes", icon: <ClinicalNotesIcon /> },
		{ text: "CardioLoad", icon: <CardioLoadIcon />, count: 3 },
		{ text: "StressManagement", icon: <HeadIcon /> },
		{ text: "Pulmonology", icon: <PulmonologyIcon /> },
		{ text: "Gastroenterolgy", icon: <GastroenterolgyIcon /> },
		{ text: "Endocrinology", icon: <EndocrinologyIcon /> },
		{ text: "Pulmonology1", icon: <Pulmonology1Icon /> },
		{ text: "Urology", icon: <UrologyIcon /> },
		{ text: "UlnaRadiusAlt", icon: <UlnaRadiusAltIcon /> },
		{ text: "Gynecology", icon: <GynecologyIcon /> },
		{ text: "Hematology", icon: <HematologyIcon /> },
		{ text: "Nephrology", icon: <NephrologyIcon /> },
		{ text: "Alergy", icon: <AlergyIcon /> },
		{ text: "OxygenSaturation", icon: <OxygenSaturationIcon /> },
	];

	return (
		<div className={styles["SideBar-container"]}>
			<Dropdown
				value={dropdownValue}
				onChange={handleDropdownChange}
				onModelChange={onModelChange}
			/>
			{buttons.map((data, index) => (
				<IconButton
					key={data.text}
					onClick={() => {
						handleZoom(data.text);
						if (data.text === "ClinicalNotes") {
							setDropdownValue("total");
						} else if (data.text === "CardioLoad") {
							setDropdownValue("cardio");
						}
					}}
					active={activeButton === data.text}
					disabled={index > 1}
				>
					{data.count && (
						<span className={styles["SideBar-count"]}>{data.count}</span>
					)}
					{data.icon}
				</IconButton>
			))}
		</div>
	);
};

export default SideBar;
