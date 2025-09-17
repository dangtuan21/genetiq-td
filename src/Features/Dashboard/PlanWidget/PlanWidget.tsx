import { useState } from "react";
import styles from "./PlanWidget.module.scss";
import { Tabs } from "./Components/Tabs/Tabs";
import { PlanTable } from "./Components/PlanTable/PlanTable";
import { PlanAggregate } from "./Components/PlanAggregate/PlanAggregate";
import { PlanSection } from "./helpers/planMockData";

interface PlanWidgetProps {
	backgroundColor: string;
	planData: PlanSection[];
}

export const PlanWidget = ({ backgroundColor, planData }: PlanWidgetProps) => {
	const [activeTab, setActiveTab] = useState(planData[0].title);
	const [transitioning, setTransitioning] = useState(false);

	const getActionPlanData = () => {
		return planData
			.filter((section) => section.title !== "Action Plan")
			.flatMap((section) =>
				section.data.map((item) => ({
					...item,
					group: section.title,
				})),
			);
	};

	const enrichedPlanMockData = planData.map((section) =>
		section.title === "Action Plan"
			? { ...section, data: getActionPlanData() }
			: section,
	);

	const activeSection = enrichedPlanMockData.find(
		(section) => section.title === activeTab,
	);

	const handleTabChange = (newTab: string) => {
		setTransitioning(true);
		setActiveTab(newTab);
	};

	return (
		<div
			className={`${styles["PlanWidget-wrapper"]} ${backgroundColor === "blue" && styles["PlanWidget-wrapper-blue"]}`}
		>
			<Tabs
				sections={enrichedPlanMockData}
				activeTab={activeTab}
				setActiveTab={handleTabChange}
				backgroundColor={backgroundColor}
			/>
			<div className={styles["PlanWidget-content"]}>
				{activeTab === "Action Plan" && activeSection ? (
					<PlanAggregate
						section={activeSection}
						setActiveTab={setActiveTab}
						backgroundColor={backgroundColor}
					/>
				) : (
					<>
						{activeSection && (
							<PlanTable
								section={activeSection}
								setActiveTab={setActiveTab}
								transitioning={transitioning}
								setTransitioning={setTransitioning}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};
