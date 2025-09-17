import { Outlet, useLocation } from "react-router-dom";
import Logo from "@assets/General/LogoGenetiq.svg?react";
import styles from "./ConfigLayout.module.scss";
import { ConfigControl } from "@/Features/Onboarding/ConfigControl/ConfigControl";
import { ConfigControlItems } from "@/App/Consts";

export const ConfigLayout = () => {
	const location = useLocation();

	const endpoint = location.pathname.split("/")[2];
	return (
		<div className={styles["Config-container"]}>
			<div className={styles["logo-wrapper"]}>
				<Logo />
				{endpoint && (
					<ConfigControl
						selectedItem={
							Object.values(ConfigControlItems).find(
								(item) => item.url === location.pathname,
							) || { title: "", url: "" }
						}
					/>
				)}
			</div>

			<Outlet />
		</div>
	);
};
