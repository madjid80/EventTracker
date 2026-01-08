import type { FastifyInstance, FastifyPluginOptions } from "fastify";

const versionHandler =
  (version: string) =>
  (
    instance: FastifyInstance,
    _: FastifyPluginOptions,
    next: (err?: Error | undefined) => void
  ) => {
    instance.get("/version", (_req, res) => res.send(version ?? ""));
    next();
  };

const rootHandlers = {
  routes: [versionHandler],
};

export { rootHandlers };
