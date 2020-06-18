import fastify, { FastifyError, FastifyInstance } from '../../fastify';
import { expectAssignable, expectError, expectType } from 'tsd';

const server = fastify()

expectAssignable<FastifyInstance>(server.addSchema({
    type: 'null'
}))
expectAssignable<FastifyInstance>(server.addSchema({
    schemaId: 'id'
}))
expectAssignable<FastifyInstance>(server.addSchema({
    schemas: []
}))

server.setErrorHandler((function (error, request, reply) {
  expectAssignable<FastifyInstance>(this)
}))

server.setErrorHandler<FastifyError>((function (error, request, reply) {
  expectType<FastifyError>(error)
}))

function fastifyErrorHandler(this: FastifyInstance, error: FastifyError) {}
server.setErrorHandler(fastifyErrorHandler)

function nodeJSErrorHandler(error: NodeJS.ErrnoException) {}
server.setErrorHandler(nodeJSErrorHandler)

function invalidErrorHandler(error: number) {}
expectError(server.setErrorHandler(invalidErrorHandler))
