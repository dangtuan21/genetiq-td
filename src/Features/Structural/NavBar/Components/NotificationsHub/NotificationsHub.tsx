import React from "react";
import BellIcon from "@assets/Navbar/Icons/notification.svg?react";
import styles from "./NotificationHub.module.scss";

interface NotificationHubProps {
	IsBadge: boolean;
	// onClick: () => void;
	disabled?: boolean;
}

const NotificationHub: React.FC<NotificationHubProps> = ({
	IsBadge = false,
	// onClick,
	disabled = false,
}) => (
	<button
		className={styles["notification-button"]}
		onClick={() => console.log("open notification")}
		disabled={disabled}
	>
		{IsBadge ? <div className={styles["badge"]} /> : null}
		<BellIcon />
	</button>
);

export default NotificationHub;
