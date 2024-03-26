import awsLambdaFastify from "@fastify/aws-lambda";
import fastify, { FastifyInstance } from "fastify";
import { routes } from "./app.module";
import { env } from "./config";
import { errorHandler } from "./config/error";
import { registerPlugins } from "./plugins";
import { typeormDataSource } from "./database";

const bootstrap = (): FastifyInstance => {
	const server: FastifyInstance = fastify({
		logger: true,
	});
	server.setErrorHandler((error, request, reply) =>
		errorHandler(error, request, reply),
	);
	registerPlugins(server, env);
	server.register(routes, { prefix: env.stripPrefix.path });
	return server;
};

if (require.main === module) {
	bootstrap().listen({ port: env.app.port });
}

export const handler = async (event: any, context: any): Promise<any> => {
	context.callbackWaitsForEmptyEventLoop = false;
	if(!typeormDataSource.isInitialized) 
		await typeormDataSource.initialize()
			.then(() => {
			process.stdout.write(
				"\n\x1b[32mConnection to database successful!\x1b[0m\n",
			);
			})
			.catch((error) => {
			process.stdout.write(
				`\n\x1b[31mERROR: Unable to connect to the database: ${error}\x1b[0m\n`,
			);
			});

	return awsLambdaFastify(bootstrap())(event, context);
}