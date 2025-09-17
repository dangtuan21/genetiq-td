import styles from "./UploadMethod.module.scss";

import { UploadMethodSelect } from "@/Features/Onboarding/UploadMethod/UploadMethodSelect";

const Config = () => {
	return (
		<div className={styles["UploadMethod-container-outter"]}>
			<UploadMethodSelect />
		</div>
	);
};

export default Config;
