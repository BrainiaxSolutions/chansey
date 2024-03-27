import { FastifyInstance } from "fastify";
import { userRouteV1 } from "./v1/modules/user/user.route";
import { shelterRouteV1 } from "./v1/modules/shelter/shelter.route";

const registerRoutes = (server: FastifyInstance, routes: any[]): void => {
	routes.forEach((route) => {
		server.route(route);
	});
};

export const routes = async (server: FastifyInstance): Promise<void> => {
	registerRoutes(server, [...shelterRouteV1]);
};
