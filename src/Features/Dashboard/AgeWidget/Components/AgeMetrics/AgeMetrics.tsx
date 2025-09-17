import styles from "./AgeMetrics.module.scss";
import Shape from "@assets/AgeWidget/Shape.svg?react";
import Arrows from "@assets/AgeWidget/ConvergeArrowsIcon.svg?react";

interface AgeMetricsProps {
	ageData: {
		biologicalAge: number;
		chronoAge: number;
	};
}

export const AgeMetrics: React.FC<AgeMetricsProps> = ({ ageData }) => {
	return (
		<div className={styles["AgeMetrics-age"]}>
			<div className={styles["AgeMetrics-shape-container"]}>
				<Shape className={styles["AgeMetrics-shape"]} />
				<div className={styles["AgeMetrics-content"]}>
					<div className={styles["AgeMetrics-content-title"]}>
						Biological age
					</div>
					<div
						className={`${styles["AgeMetrics-content-value"]} ${styles["AgeMetrics-border-green"]}`}
					>
						{ageData.biologicalAge}
						<span className={styles["AgeMetrics-content-units"]}>yrs</span>
					</div>
				</div>
			</div>
			<div className={styles["AgeMetrics-icon-container"]}>
				<Arrows />
			</div>
			<div className={styles["AgeMetrics-shape-container"]}>
				<Shape className={styles["AgeMetrics-shape-rotated"]} />
				<div className={styles["AgeMetrics-content-rotated"]}>
					<div className={styles["AgeMetrics-content-title"]}>
						Chronological age
					</div>
					<div
						className={`${styles["AgeMetrics-content-value"]} ${styles["AgeMetrics-border-blue"]}`}
					>
						{ageData.chronoAge}
						<span className={styles["AgeMetrics-content-units"]}>yrs</span>
					</div>
				</div>
			</div>
		</div>
	);
};
