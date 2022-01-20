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
 *   !proto.token.RegisterResponse>}
 */
const methodDescriptor_TokenPrt_Register = new grpc.web.MethodDescriptor(
  '/token.TokenPrt/Register',
  grpc.web.MethodType.UNARY,
  proto.token.SimpleAccountDto,
  proto.token.RegisterResponse,
  /**
   * @param {!proto.token.SimpleAccountDto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.token.RegisterResponse.deserializeBinary
);


/**
 * @param {!proto.token.SimpleAccountDto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.token.RegisterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.token.RegisterResponse>|undefined}
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
 * @return {!Promise<!proto.token.RegisterResponse>}
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


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.token.SimpleAccountDto,
 *   !proto.token.LoginResponse>}
 */
const methodDescriptor_TokenPrt_Login = new grpc.web.MethodDescriptor(
  '/token.TokenPrt/Login',
  grpc.web.MethodType.UNARY,
  proto.token.SimpleAccountDto,
  proto.token.LoginResponse,
  /**
   * @param {!proto.token.SimpleAccountDto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.token.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.token.SimpleAccountDto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.token.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.token.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.token.TokenPrtClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/token.TokenPrt/Login',
      request,
      metadata || {},
      methodDescriptor_TokenPrt_Login,
      callback);
};


/**
 * @param {!proto.token.SimpleAccountDto} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.token.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.token.TokenPrtPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/token.TokenPrt/Login',
      request,
      metadata || {},
      methodDescriptor_TokenPrt_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.token.TicketProtoDto,
 *   !proto.token.TicketResponseDto>}
 */
const methodDescriptor_TokenPrt_Ticket = new grpc.web.MethodDescriptor(
  '/token.TokenPrt/Ticket',
  grpc.web.MethodType.UNARY,
  proto.token.TicketProtoDto,
  proto.token.TicketResponseDto,
  /**
   * @param {!proto.token.TicketProtoDto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.token.TicketResponseDto.deserializeBinary
);


/**
 * @param {!proto.token.TicketProtoDto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.token.TicketResponseDto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.token.TicketResponseDto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.token.TokenPrtClient.prototype.ticket =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/token.TokenPrt/Ticket',
      request,
      metadata || {},
      methodDescriptor_TokenPrt_Ticket,
      callback);
};


/**
 * @param {!proto.token.TicketProtoDto} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.token.TicketResponseDto>}
 *     Promise that resolves to the response
 */
proto.token.TokenPrtPromiseClient.prototype.ticket =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/token.TokenPrt/Ticket',
      request,
      metadata || {},
      methodDescriptor_TokenPrt_Ticket);
};


module.exports = proto.token;

