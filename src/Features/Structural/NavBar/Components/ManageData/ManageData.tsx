import styles from "./ManageData.module.scss";

// Importing SVGs as React Components
import PlusIcon from "@assets/Dahsboard/Plus.svg?react";

const ManageData = () => {
	return (
		<div className={styles["ManageData"]}>
			<button className={styles["icon-button"]}>
				<PlusIcon />
			</button>
			<p className={styles["p"]}>Manage data</p>
		</div>
	);
};

export default ManageData;
