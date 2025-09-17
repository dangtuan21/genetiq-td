import React, { useEffect, useState } from "react";
import { CircleProgressBar } from "./Components/ProgressBar/ProgressBar";
import { UploadProcesser } from "./Components/UploadProcesser/UploadProcesser";
import styles from "./UploadProcess.module.scss";
import ArrowRightIcon from "@assets/General/ArrowRight.svg?react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/App/Routes/Paths";

interface UploadProcessProps {
	uploadedFiles: File[];
	setIsProcessing: (isProcessing: boolean) => void;
}

export const UploadProcess: React.FC<UploadProcessProps> = ({
	uploadedFiles,
	setIsProcessing,
}) => {
	const [progress, setProgress] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		setIsProcessing(true);
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					setIsProcessing(false);
					clearInterval(interval);
					return 100;
				}
				return prev + 1;
			});
		}, 100);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles["upload-process-container"]}>
			<div className={styles["left-side"]}>
				<CircleProgressBar progress={progress} />
				<div className={styles["upload-container"]}>
					<div className={styles["upload-info"]}>
						<div className={styles["title"]}>
							Your files are being processed.
						</div>
						<div className={styles["description"]}>
							Sit back and relax while we generate your healthcare digital twin!
							This should take (only a few minutes/up to 30 mins). We will
							notify you hudson@email.com as soon as its ready!
						</div>
					</div>
					<div className={styles["processer-container"]}>
						{uploadedFiles.map((file) => (
							<UploadProcesser
								key={file.name}
								fileName={file.name}
								status='done'
							/>
						))}
					</div>
				</div>
				{progress === 100 && (
					<button
						className={styles["submit"]}
						onClick={() => navigate(paths.dashboard.root)}
					>
						Submit My Health Data
						<ArrowRightIcon />
					</button>
				)}
			</div>
			<div className={styles["right-side"]}></div>
		</div>
	);
};
