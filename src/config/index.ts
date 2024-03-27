import * as application from "../../package.json";

type Env = {
	app: { port: number; environment: string; serverlessOffline: string };
	plugins: { swagger: { basePath: string } };
	stripPrefix: { path: string };
	database: { name: "mongodb"; url: string };
};

export const env = Object.freeze({
	app: {
		port: Number(process.env.PORT),
		environment: process.env.APP_ENVIRONMENT,
		serverlessOffline: process.env.SERVERLESS_OFFLINE,
	},
	plugins: {
		swagger: {
			basePath: Object.is(process.env.USE_ROUTE_PREFIX, "true")
				? `/api/${application.name.replace(/-/g, "")}/`
				: "/",
		},
	},
	stripPrefix: {
		path: `/api/${application.name.replace(/-/g, "")}`,
	},
	database: {
		name: process.env.DB_NAME,
		url: process.env.DB_URL,
	},
} as Env);
