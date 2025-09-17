import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelector.module.scss";

interface Language {
	code: string;
	name: string;
}

const languages: Language[] = [
	{ code: "en", name: "English" },
	{ code: "fr", name: "Français" },
];

const LanguageSelector: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentLanguage, setCurrentLanguage] = useState<Language>(
		languages[0],
	);
	const { i18n } = useTranslation();

	// Update current language when i18n language changes
	useEffect(() => {
		const lang =
			languages.find((lang) => lang.code === i18n.language) || languages[0];
		setCurrentLanguage(lang);
		document.documentElement.lang = i18n.language;

		// Log available languages and resources
		console.log("Available languages:", i18n.languages);
		console.log(
			"Current language resources:",
			i18n.getResourceBundle(i18n.language, "translation"),
		);
	}, [i18n.language]);

	const changeLanguage = useCallback(
		async (languageCode: string) => {
			console.log("Attempting to change language to:", languageCode);

			try {
				// First, check if the language is supported
				if (!languages.some((lang) => lang.code === languageCode)) {
					console.error(`Language ${languageCode} is not supported`);
					return;
				}

				// Change the language
				await i18n.changeLanguage(languageCode);

				// Force a re-render of the app to update all translations
				window.location.reload();
			} catch (error) {
				console.error("Error changing language:", error);
			}
		},
		[i18n],
	);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(`.${styles["language-selector"]}`)) {
				setIsOpen(false);
			}
		},
		[styles],
	);

	useEffect(() => {
		const handleClick = (event: MouseEvent) =>
			handleClickOutside(event as unknown as MouseEvent);
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [handleClickOutside]);

	return (
		<div className={styles["language-selector"]}>
			<button
				type='button'
				className={styles["language-button"]}
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Change language'
				aria-expanded={isOpen}
				aria-haspopup='true'
			>
				<span className={styles["language-code"]}>
					{currentLanguage.code.toUpperCase()}
				</span>
				<svg
					width='12'
					height='7'
					viewBox='0 0 12 7'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className={`${styles["dropdown-icon"]} ${isOpen ? styles["open"] : ""}`}
					aria-hidden='true'
				>
					<path
						d='M1 1L6 6L11 1'
						stroke='currentColor'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			{isOpen && (
				<div className={styles["language-dropdown"]} role='menu'>
					{languages.map((language) => (
						<button
							key={language.code}
							type='button'
							className={`${styles["language-option"]} ${
								language.code === currentLanguage.code ? styles["active"] : ""
							}`}
							onClick={() => changeLanguage(language.code)}
							role='menuitem'
							lang={language.code}
							aria-label={`Switch to ${language.name}`}
						>
							{language.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageSelector;
