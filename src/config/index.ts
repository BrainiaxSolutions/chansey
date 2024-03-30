import * as application from "../../package.json";

type Env = {
  app: { port: number; environment: string; serverlessOffline: string };
  plugins: { swagger: { basePath: string } };
  stripPrefix: { path: string };
  db: { name: "mongodb"; url: string };
  providers: {
    geocoder: {
      name: "google";
      url: string;
      key: string;
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
    geocoder: {
      name: process.env.NAME_PROVIDER_GEOCODING,
      url: process.env.URL_GEOCODING,
      key: process.env.API_KEY_GEOCODING,
    },
  },
} as Env);
