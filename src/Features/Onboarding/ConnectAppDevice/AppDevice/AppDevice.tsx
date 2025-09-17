import styles from "./AppDevice.module.scss";
import { AppCard } from "./Components/AppCard/AppCard";
import OmronLogo from "@assets/AppDevice/OmronLogo.svg";
import AppleLogo from "@assets/AppDevice/AppleLogo.svg";
import QardioLogo from "@assets/AppDevice/QardioLogo.svg";
import HuaweiLogo from "@assets/AppDevice/HuaweiLogo.svg";
import OuraLogo from "@assets/AppDevice/OuraLogo.svg";
import FreeStyleLogo from "@assets/AppDevice/FreeStyleLogo.svg";
import WithingsLogo from "@assets/AppDevice/WithingsLogo.svg";
import EHRsDatabase from "@assets/General/EHRDatabase.svg";

export const AppDevice = () => {
	const apps = [
		{
			img: EHRsDatabase,
			title: "EHRs Database",
			description: "Digital health records",
		},
		{
			img: OmronLogo,
			title: "Omron",
			description: "Platinum / Evolv / Complete",
		},
		{
			img: AppleLogo,
			title: "Apple",
			description: "Wathc Series / Ultra / SE / Nike",
		},
		{
			img: QardioLogo,
			title: "Qardio",
			description: "QardioBase, QardioCore, QardioArm",
		},
		{
			img: HuaweiLogo,
			title: "Huawei",
			description: "Watch GT 5, Band 8, Scale 3",
		},
		{
			img: OuraLogo,
			title: "OURA",
			description: "Ring Gen 2, Rign Gen 3",
		},
		{
			img: FreeStyleLogo,
			title: "FreeStyle",
			description: "Libre2 / 3 (Glocose Monitor)",
		},
		{
			img: WithingsLogo,
			title: "Witings E",
			description: "Body+, BPM Core, Sleep Analyzer",
		},
	];
	return (
		<div className={styles["app-container"]}>
			{apps.map((app) => (
				<AppCard {...app} />
			))}
		</div>
	);
};
