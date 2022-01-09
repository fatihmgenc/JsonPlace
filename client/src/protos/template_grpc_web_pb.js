/**
 * @fileoverview gRPC-Web generated client stub for template
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.template = require('./template_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.template.TemplatePrtClient =
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
proto.template.TemplatePrtPromiseClient =
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
 *   !proto.template.TemplateProtoDto,
 *   !proto.template.SaveTemplateResponse>}
 */
const methodDescriptor_TemplatePrt_SaveTemplate = new grpc.web.MethodDescriptor(
  '/template.TemplatePrt/SaveTemplate',
  grpc.web.MethodType.UNARY,
  proto.template.TemplateProtoDto,
  proto.template.SaveTemplateResponse,
  /**
   * @param {!proto.template.TemplateProtoDto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.template.SaveTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.template.TemplateProtoDto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.template.SaveTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.template.SaveTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.template.TemplatePrtClient.prototype.saveTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/template.TemplatePrt/SaveTemplate',
      request,
      metadata || {},
      methodDescriptor_TemplatePrt_SaveTemplate,
      callback);
};


/**
 * @param {!proto.template.TemplateProtoDto} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.template.SaveTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.template.TemplatePrtPromiseClient.prototype.saveTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/template.TemplatePrt/SaveTemplate',
      request,
      metadata || {},
      methodDescriptor_TemplatePrt_SaveTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.template.GetAllTemplateResponse>}
 */
const methodDescriptor_TemplatePrt_GetAll = new grpc.web.MethodDescriptor(
  '/template.TemplatePrt/GetAll',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.template.GetAllTemplateResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.template.GetAllTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.template.GetAllTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.template.GetAllTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.template.TemplatePrtClient.prototype.getAll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/template.TemplatePrt/GetAll',
      request,
      metadata || {},
      methodDescriptor_TemplatePrt_GetAll,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.template.GetAllTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.template.TemplatePrtPromiseClient.prototype.getAll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/template.TemplatePrt/GetAll',
      request,
      metadata || {},
      methodDescriptor_TemplatePrt_GetAll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.template.TemplateDeleteProto,
 *   !proto.template.SaveTemplateResponse>}
 */
const methodDescriptor_TemplatePrt_Delete = new grpc.web.MethodDescriptor(
  '/template.TemplatePrt/Delete',
  grpc.web.MethodType.UNARY,
  proto.template.TemplateDeleteProto,
  proto.template.SaveTemplateResponse,
  /**
   * @param {!proto.template.TemplateDeleteProto} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.template.SaveTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.template.TemplateDeleteProto} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.template.SaveTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.template.SaveTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.template.TemplatePrtClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/template.TemplatePrt/Delete',
      request,
      metadata || {},
      methodDescriptor_TemplatePrt_Delete,
      callback);
};


/**
 * @param {!proto.template.TemplateDeleteProto} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.template.SaveTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.template.TemplatePrtPromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/template.TemplatePrt/Delete',
      request,
      metadata || {},
      methodDescriptor_TemplatePrt_Delete);
};


module.exports = proto.template;

