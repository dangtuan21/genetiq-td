import { ProgressBar } from "./Components/ProgressBar/ProgressBar";
import styles from "./TrackerWidget.module.scss";
import Logo from "@assets/TrackerWidget/logo.svg?react";

export const TrackerWidget = () => {
	return (
		<div className={styles["TrackerWidget-container"]}>
			<div className={styles["TrackerWidget-Head"]}>
				<div className={styles["TrackerWidget-icon-container"]}>
					<Logo className={styles["TrackerWidget-icon"]} />
				</div>
				<p className={styles["TrackerWidget-text"]}>
					Stay tuned. We are checking your{" "}
					<span className={styles["TrackerWidget-text-highlight"]}>
						Cholesterol
					</span>
				</p>
			</div>
			<ProgressBar progress={31} />
			<p className={styles["TrackerWidget-text"]}>
				results expected in{" "}
				<span className={styles["TrackerWidget-text-highlight"]}>3 days</span>
			</p>
		</div>
	);
};
