import { useState } from "react";
import styles from "./ReasonsTable.module.scss";

import Chevron from "@assets/ConcernWidget/Chevron.svg?react";
import { Reason } from "../../helpers/detailedSystemConcerns";
import { ReasonRow } from "../ReasonRow/ReasonRow";

interface ReasonsTableProps {
	reasons: Reason[];
	detailIndex: number;
}

export const ReasonsTable: React.FC<ReasonsTableProps> = ({
	reasons,
	detailIndex,
}) => {
	const [isShowMore, setIsShowMore] = useState(false);

	const reasonsToShow = isShowMore ? reasons : reasons.slice(0, 3);

	return (
		<div className={styles["ReasonsTable-container"]}>
			<div className={styles["ReasonsTable-head"]}>
				<div className={styles["ReasonsTable-title"]}>How we know this</div>
				<div
					className={styles["ReasonsTable-more"]}
					onClick={() => setIsShowMore((prev) => !prev)}
				>
					<p className={styles["ReasonsTable-more-text"]}>
						{isShowMore ? "Show less" : `Show ${reasons.length - 3} more`}
					</p>
					<div className={styles["ReasonsTable-chevron-container"]}>
						<Chevron
							className={`${styles["ReasonsTable-chevron"]} ${
								isShowMore ? styles["rotate-chevron"] : ""
							}`}
						/>
					</div>
				</div>
			</div>
			<div className={styles["ReasonsTable-table"]} key={detailIndex}>
				{reasonsToShow.map((reason) => (
					<ReasonRow reason={reason} key={reason.id} />
				))}
			</div>
		</div>
	);
};
