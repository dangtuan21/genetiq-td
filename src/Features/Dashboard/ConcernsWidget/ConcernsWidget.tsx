import { useState } from "react";
import styles from "./ConcernsWidget.module.scss";
import Chevron from "@assets/ConcernWidget/Chevron.svg?react";
import Slope from "@assets/ConcernsWidget/Slope.svg?react";
import { concernsMockData } from "./helpers/concernsMockData";
import { detailedSystemConcerns } from "./helpers/detailedSystemConcerns";
import { ConcernsCard } from "./Components/ConcernsCard/ConcernsCard";
import { DetailsCard } from "./Components/DetailsCard/DetailsCard";
import { ReasonsTable } from "./Components/ReasonsTable/ReasonsTable";
import { SymptomsList } from "./Components/SymptomsList/SymptomsList";
import { PlanWidget } from "../PlanWidget/PlanWidget";

interface ConcernsWidgetProps {
	category: string;
}

export const ConcernsWidget: React.FC<ConcernsWidgetProps> = ({ category }) => {
	const [isShowMore, setIsShowMore] = useState(false);
	const [detailIndex, setDetailIndex] = useState(1);

	const concernsToShow = isShowMore
		? concernsMockData
		: concernsMockData.slice(0, 3);

	const selectedSystem = detailedSystemConcerns[0];
	const reasons = selectedSystem.details[detailIndex - 1]?.reasons ?? [];
	const symptoms = selectedSystem?.details[detailIndex - 1]?.symptoms;
	const planData =
		category === "total"
			? selectedSystem.defaultPlan
			: (selectedSystem.details[detailIndex - 1]?.plan ??
				selectedSystem.defaultPlan);

	const handleShowMore = () => {
		setIsShowMore((prev) => !prev);
	};

	return (
		<div className={styles["ConcernWidget-wrapper"]}>
			<div className={styles["ConcernWidget-head"]}>
				<div className={styles["ConcernWidget-tab-container"]}>
					<div className={styles["ConcernWidget-tab"]}>
						Key Areas of Concern
					</div>
					<Slope className={styles["ConcernWidget-slope"]} />
				</div>

				<div
					className={styles["ConcernWidget-more"]}
					onClick={() => handleShowMore()}
				>
					<p className={styles["ConcernWidget-more-text"]}>
						{isShowMore ? "Show Less" : "Show all"}
					</p>
					<div className={styles["ConcernWidget-chevron-container"]}>
						<Chevron
							className={`${styles["ConcernWidget-chevron"]} ${
								isShowMore ? styles["rotate-chevron"] : ""
							}`}
						/>
					</div>
				</div>
			</div>
			<div className={styles["ConcernWidget-content"]}>
				<div className={styles["ConcernWidget-cards-layout"]}>
					<div
						className={`${styles["ConcernWidget-concern-cards"]} ${
							category !== "total"
								? styles["ConcernWidget-concern-cards-hidden"]
								: styles["ConcernWidget-concern-cards-visible"]
						}`}
					>
						{concernsToShow.map((concern) => (
							<ConcernsCard key={concern.id} concern={concern} />
						))}
					</div>

					<div
						className={`${styles["ConcernWidget-detail-cards"]} ${
							category !== "total"
								? styles["ConcernWidget-detail-cards-visible"]
								: styles["ConcernWidget-detail-cards-hidden"]
						}`}
					>
						{selectedSystem.details.map((detail) => (
							<DetailsCard
								key={`${detail.id}-${category}`}
								detail={detail}
								detailIndex={detailIndex}
								setDetailIndex={setDetailIndex}
							/>
						))}
					</div>
				</div>
				<div
					className={`${styles["ConcernWidget-reasons"]} ${
						category !== "total"
							? styles["ConcernWidget-reasons-visible"]
							: styles["ConcernWidget-reasons-hidden"]
					}`}
				>
					<ReasonsTable reasons={reasons} detailIndex={detailIndex} />
				</div>

				<div
					className={`${styles["ConcernWidget-symptoms"]} ${
						category !== "total"
							? styles["ConcernWidget-symptoms-visible"]
							: styles["ConcernWidget-symptoms-hidden"]
					}`}
				>
					<SymptomsList symptoms={symptoms} />
				</div>

				<PlanWidget backgroundColor='white' planData={planData} />
			</div>
		</div>
	);
};
