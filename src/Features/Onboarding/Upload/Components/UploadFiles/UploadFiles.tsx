import styles from "./UploadFiles.module.scss";
import FrameIcon from "@assets/General/Frame2.svg?react";
import LabcorpIcon from "@assets/General/Labcorp.svg?react";
import { UploadItem } from "../UploadItem/UploadItem";
import { UploadFileTypes } from "@/App/Consts";
import { ShoppingCartPlusIcon } from "@/assets/Icons/ShoppingCartPlus";
import React from "react";

interface UploadFilesProps {
	uploadedFiles: {
		file: File;
		isUploading: boolean;
		type: string;
		progress: number;
	}[];
	onFileChange: (files: FileList, type: string) => void;
	onUploadStart: (file: File) => void;
	onUploadComplete: (file: File) => void;
	onFileRemove: (file: File) => void;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({
	uploadedFiles,
	onFileChange,
	onUploadStart,
	onUploadComplete,
	onFileRemove,
}) => {
	return (
		<div className={styles["upload-body"]}>
			<div className={styles["info-wrapper"]}>
				<div className={styles["upload-info"]}>
					<div className={styles["title"]}>Upload Files</div>
					<div className={styles["description"]}>
						Upload relevant medical and personal documents: Medical reports,
						Test Results.
					</div>
				</div>
				<div className={styles["upload-items"]}>
					{Object.keys(UploadFileTypes).map((fileType) => (
						<UploadItem
							key={fileType}
							{...UploadFileTypes[fileType as keyof typeof UploadFileTypes]}
							uploadedFiles={uploadedFiles.filter(
								(item) => item.type === fileType,
							)}
							onFileChange={(files) => onFileChange(files, fileType)}
							onUploadStart={onUploadStart}
							onUploadComplete={onUploadComplete}
							onFileRemove={onFileRemove}
						/>
					))}
				</div>
			</div>
			<div className={styles["bottom-side"]}>
				<div className={styles["content"]}>
					<div className={styles["icon-wrapper"]}>
						<FrameIcon />
					</div>
					<div className={styles["info"]}>
						<div>
							<div className={styles["title"]}>Don’t have any data?</div>
							<div className={styles["description"]}>
								No problem! Order these genetic tests to get insights into your
								health.
							</div>
						</div>
						<button className={styles["order-test-btn"]}>
							Order Tests <ShoppingCartPlusIcon fill='rgba(108, 170, 247, 1)' />
						</button>
					</div>
				</div>
				<div className={styles["img-wrapper"]}>
					<div className={styles["wrapper"]}>
						<div className={styles["img"]}>
							<div className={styles["background-image"]} />
							<LabcorpIcon style={{ zIndex: 10 }} />
						</div>
						<div className={styles["title"]}>Certified genetic labs</div>
					</div>
				</div>
			</div>
		</div>
	);
};
