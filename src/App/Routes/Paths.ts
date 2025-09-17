export const paths = {
	auth: {
		login: "/login",
		register: "/register",
	},
	dashboard: {
		root: "/dashboard",
		system: "/dashboard/:systemName",
		detailedRisk: "/dashboard/:systemName/:riskName",
	},
	config: {
		root: "/config",
		importOrUpload: "/config/import-or-upload",
		connectApp: "/config/connect-app",
	},
};
