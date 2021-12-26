/**
 * @fileoverview gRPC-Web generated client stub for token
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.token = require('./token_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.token.TokenPrtClient =
    function(hostname, credentials, options) {
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
proto.token.TokenPrtPromiseClient =
    function(hostname, credentials, options) {
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
 *   !proto.token.SimpleAccountDto,
 *   !proto.token.Response>}
 */
const methodDescriptor_TokenPrt_Register = new grpc.web.MethodDescriptor(
  '/token.TokenPrt/Register',
  grpc.web.MethodType.UNARY,
  proto.token.SimpleAccountDto,
  proto.token.Response,
  /**
   * @param {!proto.token.SimpleAccountDto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.token.Response.deserializeBinary
);


/**
 * @param {!proto.token.SimpleAccountDto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.token.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.token.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.token.TokenPrtClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/token.TokenPrt/Register',
      request,
      metadata || {},
      methodDescriptor_TokenPrt_Register,
      callback);
};


/**
 * @param {!proto.token.SimpleAccountDto} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.token.Response>}
 *     Promise that resolves to the response
 */
proto.token.TokenPrtPromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/token.TokenPrt/Register',
      request,
      metadata || {},
      methodDescriptor_TokenPrt_Register);
};


module.exports = proto.token;

