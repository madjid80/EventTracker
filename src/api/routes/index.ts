import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import { usersRoutes } from "./users/index.js";
import { rootHandlers } from "./rootsHandler.js";
export async function registerRoutes(app: FastifyInstance) {
  const NO_VERSION = "";
  const V1 = "v1";

  for (const route of usersRoutes.routes) {
    await app.register(route, { prefix: `/${V1}/users` });
  }

  for (const route of rootHandlers.routes) {
    await app.register(route(V1), { prefix: NO_VERSION });
  }
}
