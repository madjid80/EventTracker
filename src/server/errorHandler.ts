import { logger } from "@utilities/index.js";
import {
  type FastifyError,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";

const syntaxErrorHandler = async (
  _: FastifyRequest,
  reply: FastifyReply,
  error: Error
) => {
  const body = {
    message: `Invalid JSON body passed: ${error.message}`,
  };
  await reply.status(400).send(body);
};

const fastifyErrorHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply,
  error: FastifyError
) => {
  const statusCode =
    error.statusCode !== undefined && !isNaN(Number(error.statusCode))
      ? error.statusCode
      : 500;

  logger.error(error.toString());

  const body = {
    message: error.message,
  };
  await reply.status(statusCode).send(body);
};

export const errorHandler = async (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof SyntaxError) {
    await syntaxErrorHandler(request, reply, error);
  } else if (error.name === "FastifyError") {
    await fastifyErrorHandler(request, reply, error as FastifyError);
  } else if ((error as { code?: string }).code === "FST_ERR_VALIDATION") {
    logger.error(JSON.stringify(error));
    //FIXME: Find a better way to handle zod validation errors
    const body = {
      message: (error as any).validation
        .map(
          (ve: { message: string; instancePath: string }) =>
            "("+ve.instancePath + "): " + ve.message
        )
        .join(", "),
    };
    await reply.status(400).send(body);
  } else {
    logger.error(JSON.stringify(error));
    await reply.status(500).send({ message: "An unknown error occurred." });
  }
};
