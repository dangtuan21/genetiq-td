import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Initialize i18n
const initializeI18n = () => {
	i18n
		.use(Backend)
		.use(LanguageDetector)
		.use(initReactI18next)
		.init({
			fallbackLng: "en",
			supportedLngs: ["en", "fr"],
			debug: true,
			interpolation: {
				escapeValue: false,
			},
			backend: {
				loadPath: "/locales/{{lng}}/{{ns}}.json",
			},
			detection: {
				order: ["localStorage", "navigator"],
				caches: ["localStorage"],
			},
			react: {
				useSuspense: true,
			},
		});

	// Debug logging
	i18n.on("languageChanged", (lng) => {
		console.log("i18n: Language changed to", lng);
		document.documentElement.lang = lng;
	});

	i18n.on("loaded", (loaded) => {
		console.log("i18n: Resources loaded", loaded);
	});

	i18n.on("failedLoading", (lng, ns, msg) => {
		console.error("i18n: Failed loading language", { lng, ns, msg });
	});

	return i18n;
};

// Initialize and export i18n instance
export default initializeI18n();
