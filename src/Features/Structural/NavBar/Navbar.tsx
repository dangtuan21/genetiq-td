import Navigation from "./Components/Navigation/Navigation";
import Logo from "@assets/General/LogoGenetiq.svg?react";
import styles from "./Navbar.module.scss";
import NotificationHub from "./Components/NotificationsHub/NotificationsHub";
import Profile from "./Components/Profile/Profile";
import ManageData from "./Components/ManageData/ManageData";
import LanguageSelector from "./Components/LanguageSelector/LanguageSelector";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";

const Navbar = () => {
	return (
		<div className={styles["navbar-container"]}>
			<div className={styles["logo-wrapper"]}>
				<Logo />
			</div>
			<Navigation />
			<div className={styles["actions-container"]}>
				<ThemeSelector />
				<LanguageSelector />
				<ManageData />
				<NotificationHub IsBadge={true} />
				<Profile />
			</div>
		</div>
	);
};

export default Navbar;
