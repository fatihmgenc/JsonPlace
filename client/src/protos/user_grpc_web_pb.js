/**
 * @fileoverview gRPC-Web generated client stub for user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.user = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.user.UserPrtClient =
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
proto.user.UserPrtPromiseClient =
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
 *   !proto.user.RemindPasswordDto,
 *   !proto.user.RemindPasswordResponse>}
 */
const methodDescriptor_UserPrt_RemindPassword = new grpc.web.MethodDescriptor(
  '/user.UserPrt/RemindPassword',
  grpc.web.MethodType.UNARY,
  proto.user.RemindPasswordDto,
  proto.user.RemindPasswordResponse,
  /**
   * @param {!proto.user.RemindPasswordDto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.RemindPasswordResponse.deserializeBinary
);


/**
 * @param {!proto.user.RemindPasswordDto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.RemindPasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.RemindPasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserPrtClient.prototype.remindPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.UserPrt/RemindPassword',
      request,
      metadata || {},
      methodDescriptor_UserPrt_RemindPassword,
      callback);
};


/**
 * @param {!proto.user.RemindPasswordDto} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.RemindPasswordResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserPrtPromiseClient.prototype.remindPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.UserPrt/RemindPassword',
      request,
      metadata || {},
      methodDescriptor_UserPrt_RemindPassword);
};


module.exports = proto.user;

