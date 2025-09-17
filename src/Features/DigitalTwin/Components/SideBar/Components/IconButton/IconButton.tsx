import styles from "./IconButton.module.scss";

interface IconButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	active?: boolean;
	disabled?: boolean;
}

export const IconButton = ({
	children,
	onClick = () => null,
	active = false,
	disabled = false,
}: IconButtonProps) => {
	return (
		<button
			onClick={disabled ? undefined : onClick}
			className={`${styles["icon-button"]} ${active ? styles["active"] : ""} ${disabled ? styles["disabled"] : ""}`}
		>
			{children}
		</button>
	);
};

export default IconButton;
