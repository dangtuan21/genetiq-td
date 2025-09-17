import { useEffect, useState } from "react";
import styles from "./ImportOrUpload.module.scss";
import { ConfirmModal } from "@/Features/Onboarding/ConfirmModal/ConfirmModal";
import { UploadFiles } from "@/Features/Onboarding/Upload/Components/UploadFiles/UploadFiles";
import { UploadProcess } from "@/Features/Onboarding/Upload/Components/UploadProcess/UploadProcess";
import { NavigationBar } from "@/Features/Onboarding/NavigationBar/NavigationBar";

const ImportOrUpload = () => {
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
	const [isOpenedConfirmModal, setIsOpenedConfirmModal] =
		useState<boolean>(false);
	const [uploadedFiles, setUploadedFiles] = useState<
		{ file: File; isUploading: boolean; type: string; progress: number }[]
	>([]);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	useEffect(() => {
		if (uploadedFiles.length) {
			if (uploadedFiles.filter((item) => item.isUploading).length === 0) {
				setIsUploading(false);
			} else {
				setIsUploading(true);
			}
		}
	}, [uploadedFiles]);

	const handleClose = () => {
		setIsOpenedConfirmModal(false);
	};

	const handleConfirm = () => {
		setIsOpenedConfirmModal(false);
		setIsConfirmed(true);
	};

	const handleFileChange = (files: FileList, type: string) => {
		const newFiles = Array.from(files).map((file) => ({
			file,
			isUploading: false,
			progress: 0,
			type,
		}));
		setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
	};

	const handleUploadStart = (file: File) => {
		setUploadedFiles((prevFiles) =>
			prevFiles.map((item) =>
				item.file === file ? { ...item, isUploading: true } : item,
			),
		);

		let progress = 0;
		const interval = setInterval(() => {
			progress += 10;
			setUploadedFiles((prevFiles) =>
				prevFiles.map((item) =>
					item.file === file
						? { ...item, progress: Math.min(progress, 100) }
						: item,
				),
			);

			if (progress >= 100) {
				clearInterval(interval);
				handleUploadComplete(file);
			}
		}, 500);
	};

	const handleUploadComplete = (file: File) => {
		setUploadedFiles((prevFiles) =>
			prevFiles.map((item) =>
				item.file === file ? { ...item, isUploading: false } : item,
			),
		);
	};

	const handleFileRemove = (file: File) => {
		setUploadedFiles((prevFiles) =>
			prevFiles.filter((item) => item.file !== file),
		);
	};

	return (
		<div className={styles["import-upload-container"]}>
			{isConfirmed ? (
				<UploadProcess
					uploadedFiles={uploadedFiles.map((item) => item.file)}
					setIsProcessing={setIsProcessing}
				/>
			) : (
				<UploadFiles
					uploadedFiles={uploadedFiles}
					onFileChange={handleFileChange}
					onUploadStart={handleUploadStart}
					onUploadComplete={handleUploadComplete}
					onFileRemove={handleFileRemove}
				/>
			)}
			<NavigationBar
				disabled={isUploading || isProcessing}
				done={isConfirmed}
				setIsOpenedConfirmModal={(opened: boolean) => {
					setIsOpenedConfirmModal(opened);
				}}
			/>
			{isOpenedConfirmModal && (
				<ConfirmModal onClose={handleClose} onConfirm={handleConfirm} />
			)}
		</div>
	);
};

export default ImportOrUpload;
