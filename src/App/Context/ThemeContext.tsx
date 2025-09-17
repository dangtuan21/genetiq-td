import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
	isDarkMode: boolean;
};

const defaultThemeContext: ThemeContextType = {
	theme: "light",
	toggleTheme: () => {},
	isDarkMode: false,
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
	children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem("theme") as Theme) || "light",
	);

	const isDarkMode = theme === "dark";

	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			return newTheme;
		});
	}, []);

	// Apply theme class to document element
	useEffect(() => {
		const root = window.document.documentElement;
		console.log("Applying theme:", theme);
		root.classList.remove("light", "dark");
		root.classList.add(theme);
		console.log("Current HTML classes:", root.className);
	}, [theme]);

	// Log initial theme
	useEffect(() => {
		console.log("Initial theme:", theme);
		console.log(
			"Initial HTML classes:",
			window.document.documentElement.className,
		);
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
