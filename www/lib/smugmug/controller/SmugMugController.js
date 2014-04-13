/**

Some ideas to add to the controller:

Embedding of images/videos: http://wiki.smugmug.net/display/API/oEmbed

**/
var _SMUGMUG_API_MIME_TYPE = 'image/jpeg';
var _SMUGMUG_API_VERSION = '1.2.2';
var _SMUGMUG_API_RESPONSE_TYPE = 'JSON';
var _SMUGMUG_API_FILE_KEY = 'file';
// New camera functionality


Ext.regController('smug_mug_controller', {
    genUploadParameters: function(sessionId, albumId, fileName, fileSize, latitude, longitude) {
        console.log("XXXXXX: " + sessionId + " / " + albumId + " / " + fileName + " / " + fileSize);
        return {
            'Keywords': 'PMC HTML5',
            'Altitude': '400',
            'Latitude': latitude,
            'Longitude': longitude,
            'Pretty': true,
            'ByteCount': fileSize,
            'FileName': fileName,
            'AlbumID': albumId,
            'SessionID': sessionId,
            'ResponseType': _SMUGMUG_API_RESPONSE_TYPE,
            'Version': _SMUGMUG_API_VERSION
        };
    },
    login: function(options) {
        mSmugMugDataSource.login(options);
    },

    getAlbumList: function(options) {
        mSmugMugDataSource.getAlbumList(options);
    },

    getImageList: function(options) {
        mSmugMugDataSource.getImageList(options);
    },

    uploadPhoto: function(options) {

        options.caller.setLoading(true);

        var sessionId = options.sessionId;
        var imageURI = options.imageURI;
        var albumId = options.albumId;

        var ft = new FileTransfer();
        var path = imageURI.fullPath;
        var name = imageURI.name;
        var params = this.genUploadParameters(sessionId, albumId, name, imageURI.size, options.latitude, options.longitude);

        console.log("uploadPhoto " + path + ", NAME " + name + ", SIZE: " + imageURI.size);

        var options = new FileUploadOptions();
        options.fileKey = _SMUGMUG_API_FILE_KEY;
        options.fileName = name;
        options.mimeType = _SMUGMUG_API_MIME_TYPE;
        options.params = params;

        console.log("---->Params");
        console.log(params);

        console.log("---->Options");
        console.log(options);

        console.log("---->");

        var photoTransferSuccess = function(result) {
            console.log('**** photoTransferSuccess ' + result);
            PMCLab.views.smugMugAlbum.setLoading(false);
            PMCLab.views.smugMugAlbum.photoUploadSuccessful(result);
        };

        var photoTransferFailure = function(error) {
            console.log('**** photoTransferFailure ' + error);
            PMCLab.views.smugMugAlbum.handleError(error);
            PMCLab.views.smugMugAlbum.setLoading(false);
        };

        console.log("----> Using PhoneGap FileTransfer...");

        ft.upload(path,
                  SMUG_MUG_UPLOAD_URL,
                  photoTransferSuccess,
                  photoTransferFailure,
                  options);
    }
});
