/**
 * @fileoverview gRPC-Web generated client stub for greet
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.greet = require('./greet_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.greet.GreeterClient =
  function (hostname, credentials, options) {
    if (!options) options = {};
    options.format = 'text';

    /**
     * @private @const {!grpc.web.GrpcWebClientBase} The client
     */
    this.client_ = new grpc.web.GrpcWebClientBase(options);

    /**
     * @private @const {string} The hostname
     */
    this.hostname_ = hostname;

  };


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.greet.GreeterPromiseClient =
  function (hostname, credentials, options) {
    if (!options) options = {};
    options.format = 'text';

    /**
     * @private @const {!grpc.web.GrpcWebClientBase} The client
     */
    this.client_ = new grpc.web.GrpcWebClientBase(options);

    /**
     * @private @const {string} The hostname
     */
    this.hostname_ = hostname;

  };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.greet.HelloRequest,
 *   !proto.greet.HelloReply>}
 */
const methodDescriptor_Greeter_SayHello = new grpc.web.MethodDescriptor(
  '/greet.Greeter/SayHello',
  grpc.web.MethodType.UNARY,
  proto.greet.HelloRequest,
  proto.greet.HelloReply,
  /**
   * @param {!proto.greet.HelloRequest} request
   * @return {!Uint8Array}
   */
  function (request) {
    return request.serializeBinary();
  },
  proto.greet.HelloReply.deserializeBinary
);


/**
 * @param {!proto.greet.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.greet.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.greet.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.greet.GreeterClient.prototype.sayHello =
  function (request, metadata, callback) {
    return this.client_.rpcCall(this.hostname_ +
      '/greet.Greeter/SayHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHello,
      callback);
  };


/**
 * @param {!proto.greet.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.greet.HelloReply>}
 *     Promise that resolves to the response
 */
proto.greet.GreeterPromiseClient.prototype.sayHello =
  function (request, metadata) {
    return this.client_.unaryCall(this.hostname_ +
      '/greet.Greeter/SayHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHello);
  };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.greet.HelloRequest,
 *   !proto.greet.HelloReply>}
 */
const methodDescriptor_Greeter_SayHelloButReverse = new grpc.web.MethodDescriptor(
  '/greet.Greeter/SayHelloButReverse',
  grpc.web.MethodType.UNARY,
  proto.greet.HelloRequest,
  proto.greet.HelloReply,
  /**
   * @param {!proto.greet.HelloRequest} request
   * @return {!Uint8Array}
   */
  function (request) {
    return request.serializeBinary();
  },
  proto.greet.HelloReply.deserializeBinary
);


/**
 * @param {!proto.greet.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.greet.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.greet.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.greet.GreeterClient.prototype.sayHelloButReverse =
  function (request, metadata, callback) {
    return this.client_.rpcCall(this.hostname_ +
      '/greet.Greeter/SayHelloButReverse',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHelloButReverse,
      callback);
  };


/**
 * @param {!proto.greet.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.greet.HelloReply>}
 *     Promise that resolves to the response
 */
proto.greet.GreeterPromiseClient.prototype.sayHelloButReverse =
  function (request, metadata) {
    return this.client_.unaryCall(this.hostname_ +
      '/greet.Greeter/SayHelloButReverse',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHelloButReverse);
  };


module.exports = proto.greet;

