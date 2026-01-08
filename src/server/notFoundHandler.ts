import type { FastifyReply, FastifyRequest } from "fastify";

export const notFoundHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const body = {
    message: `${request.method} ${request.url} - Not Found`,
  };
  await reply.status(404).send(body);
};
