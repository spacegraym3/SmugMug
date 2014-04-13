
/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *  
 * Copyright (c) 2005-2011, Nitobi Software Inc.
 * Copyright (c) 2011, Matt Kane
 */

if (!PhoneGap.hasResource("fileuploader")) {
	PhoneGap.addResource("fileuploader");

/**
 * FileUploader uploads a file to a remote server.
 */
FileUploader = function() {}

/**
 * FileUploadResult
 */
FileUploadResult = function() {
    this.bytesSent = 0;
    this.responseCode = null;
    this.response = null;
}

/**
 * FileUploaderError
 */
FileUploaderError = function(errorCode) {
    this.code = errorCode || null;
}

FileUploaderError.FILE_NOT_FOUND_ERR = 1;
FileUploaderError.INVALID_URL_ERR = 2;
FileUploaderError.CONNECTION_ERR = 3;

/**
* Given an absolute file path, uploads a file on the device to a remote server 
* using a multipart HTTP request.
* @param filePath {String}           Full path of the file on the device
* @param server {String}             URL of the server to receive the file
* @param successCallback (Function}  Callback to be invoked when upload has completed
* @param errorCallback {Function}    Callback to be invoked upon error
* @param options {FileUploadOptions} Optional parameters such as file name and mimetype           
*/
FileUploader.prototype.upload = function(filePath, server, successCallback, errorCallback, options) {
	if(!options.params) {
		options.params = {};
	} else {
		console.log("Params not null.");
	}
	if(!options.httpHeaders) {
		options.httpHeaders = {};
	} else {
		console.log("HTTP Headers not null.");
	}
	
	options.filePath = filePath;
	options.server = server;
	if(!options.fileKey) {
		options.fileKey = 'file';
	}
	if(!options.fileName) {
		options.fileName = 'image.jpg';
	}
	if(!options.mimeType) {
		options.mimeType = 'image/jpeg';
	}
	
	// successCallback required
	if (typeof successCallback != "function") {
        console.log("FileUploader Error: successCallback is not a function");
        return;
    }


    // errorCallback optional
    if (errorCallback && (typeof errorCallback != "function")) {
        console.log("FileUploader Error: errorCallback is not a function");
        return;
    }
	
    PhoneGap.exec(successCallback, errorCallback, 'FileUploader', 'upload', [options]);
};

FileUploader.prototype._castTransferError = function(pluginResult) {
	var fileError = new FileUploaderError(pluginResult.message);
	//fileError.code = pluginResult.message;
	pluginResult.message = fileError;
	return pluginResult;
}

FileUploader.prototype._castUploadResult = function(pluginResult) {
	var result = new FileUploadResult();
	result.bytesSent = pluginResult.message.bytesSent;
	result.responseCode = pluginResult.message.responseCode;
	result.response = decodeURIComponent(pluginResult.message.response);
	pluginResult.message = result;
	return pluginResult;
}

/**
 * Options to customize the HTTP request used to upload files.
 * @param fileKey {String}   Name of file request parameter.
 * @param fileName {String}  Filename to be used by the server. Defaults to image.jpg.
 * @param mimeType {String}  Mimetype of the uploaded file. Defaults to image/jpeg.
 * @param params {Object}    Object with key: value params to send to the server.
 */
FileUploadOptions = function(fileKey, fileName, mimeType, params) {
    this.fileKey = fileKey || null;
    this.fileName = fileName || null;
    this.mimeType = mimeType || null;
    this.params = params || null;
}


PhoneGap.addConstructor(function()  {
	if(!window.plugins) {
		window.plugins = {};
	}
	window.plugins.fileUploader = new FileUploader();
});


};
