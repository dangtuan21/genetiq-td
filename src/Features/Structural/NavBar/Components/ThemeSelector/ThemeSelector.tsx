import { useTheme } from "../../../../../App/Context/ThemeContext";
import { useTranslation } from "react-i18next";
import { FiMoon, FiSun } from "react-icons/fi";
import styles from "./ThemeSelector.module.scss";

const ThemeSelector = () => {
	const { t } = useTranslation();
	const { toggleTheme, isDarkMode } = useTheme();

	return (
		<button
			type='button'
			onClick={toggleTheme}
			className={styles["theme-toggle"]}
			aria-label={
				isDarkMode ? t("theme.switchToLight") : t("theme.switchToDark")
			}
			title={isDarkMode ? t("theme.switchToLight") : t("theme.switchToDark")}
		>
			{isDarkMode ? (
				<FiSun className={styles.icon} />
			) : (
				<FiMoon className={styles.icon} />
			)}
		</button>
	);
};

export default ThemeSelector;
