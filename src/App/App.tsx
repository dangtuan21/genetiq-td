import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Suspense } from "react";
import "./Styles/Global.scss";
import "./theme.css";
import Router from "./Routes/Router";
import { ThemeProvider } from "./Context/ThemeContext";
import i18n from "../i18n";

function App() {
	return (
		<Suspense fallback='loading'>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider>
					<RouterProvider router={Router} />
				</ThemeProvider>
			</I18nextProvider>
		</Suspense>
	);
}

export default App;
