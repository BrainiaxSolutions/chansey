import * as application from "../../package.json";

type Env = {
	app: { port: number; environment: string; serverlessOffline: string };
	plugins: { swagger: { basePath: string } };
	stripPrefix: { path: string };
	db: { name: "mongodb"; url: string };
	providers: {
		google: {
			geocoder: {
				name: "google";
				url: string;
				key: string;
			};
		};
		graphhopper: {
			geocoder: {
				url: string;
				key: string;
			};
		};
	};
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
	db: {
		name: process.env.DB_NAME,
		url: process.env.DB_URL,
	},
	providers: {
		google: {
			geocoder: {
				name: "google",
				url: process.env.GOOGLE_URL_GEOCODING,
				key: process.env.GOOGLE_API_KEY,
			},
		},
		graphhopper: {
			geocoder: {
				url: process.env.GRAPHHOPPER_URL_GEOCODING,
				key: process.env.GRAPHHOPPER_API_KEY,
			},
		},
	},
} as Env);
