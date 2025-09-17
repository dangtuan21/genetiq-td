import { RouteObject, Navigate } from "react-router-dom";
import { paths } from "./Paths";
import GlobalLayout from "../Layouts/GlobalLayout";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/Auth/AuthLayout";
import Dashboard from "@/Views/Dashboard/Dashboard";
import Login from "@/Views/Auth/Login/Login";
import Config from "@/Views/UploadMethod/UploadMethod";
import { ConfigLayout } from "../Layouts/ConfigLayout";
import ImportOrUpload from "@/Views/UploadMethod/ImportOrUpload/ImportOrUpload";
import ConnectAppDevice from "@/Views/UploadMethod/ConnectAppDevice/ConnectAppDevice";
import DetailedRisk from "@/Views/DetailedRisk/DetailedRisk";
import Register from "@/Views/Auth/Register/Register";
import SystemOverview from "@/Views/SystemOverview/SystemOverview";

const RoutesConfig: RouteObject[] = [
	{
		element: <GlobalLayout />,
		path: "",
		children: [
			// Auth routes
			{
				element: <AuthLayout />,
				path: "",
				children: [
					{
						element: <Login />,
						path: paths.auth.login,
					},
					{
						element: <Register />,
						path: paths.auth.register,
					},
					// Redirect root "/" to "/login"
					{
						element: <Navigate to={paths.dashboard.root} replace />,
						index: true,
					},
				],
			},
			// Main application routes
			{
				element: <MainLayout />,
				path: "",
				children: [
					{
						element: <Dashboard />,
						path: paths.dashboard.root,
					},
					{
						element: <SystemOverview />,
						path: paths.dashboard.system,
					},
					{
						element: <DetailedRisk />,
						path: paths.dashboard.detailedRisk,
					},
					{
						element: <ConfigLayout />,
						path: paths.config.root,
						children: [
							{ element: <Config />, path: paths.config.root },
							{
								element: <ImportOrUpload />,
								path: paths.config.importOrUpload,
							},
							{
								element: <ConnectAppDevice />,
								path: paths.config.connectApp,
							},
						],
					},
				],
			},
		],
	},
];

export default RoutesConfig;
