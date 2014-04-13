/**
 * Created by JetBrains WebStorm.
 * User: chriswhite
 * Date: 8/29/11
 * Time: 10:03 AM
 * To change this template use File | Settings | File Templates.
 *
 *
 * Embedding of images/videos: http://wiki.smugmug.net/display/API/oEmbed
 */

function SmugMugDataSource() {

    this.SMUGMUG_APP_NAME                = 'SmugCapture';
    this.SMUGMUG_API_URL                 = 'http://api.smugmug.com/services/api/json/1.2.2/';
    this.SMUGMUG_API_KEY                 = 'V3tb2i2CvCPPcpk4M1X2501ftQ5ua7Ma';
    this.SMUGMUG_SECRET                  = 'a9a3c953509a2c7dfb1e479bb3a53042';

    this.SMUGMUG_LOGIN_METHOD            = 'smugmug.login.withPassword';
    this.SMUGMUG_ALBUMS_METHOD           = 'smugmug.albums.get';
    this.SMUGMUG_IMAGES_METHOD           = 'smugmug.images.get';
    this.SMUGMUG_AUTH_GET_REQUEST_TOKEN  = 'smugmug.auth.getRequestToken';
    this.SMUGMUG_AUTH_GET_ACCESS_TOKEN   = 'smugmug.auth.getAccessToken';
    this.SMUGMUG_AUTH_CHECK_ACCESS_TOKEN = 'smugmug.auth.checkAccessToken';

    this.SMUGMUG_API_MIME_TYPE           = 'image/jpeg';
    this.SMUGMUG_API_VERSION             = '1.2.2';
    this.SMUGMUG_API_RESPONSE_TYPE       = 'JSON';
    this.SMUGMUG_API_FILE_KEY            = 'file';

    this.UPLOAD_KEYWORDS                 = 'PMC HTML5';
    this.JSON_CALLBACK_NAME              = 'Ext.util.JSONP.callback';
};

SmugMugDataSource.prototype.stfu = function() {
    return 'ShutTheFuckUp';
};

/**
 * Required parameters specified in the 'options' JSON object include username, password and a caller
 * object that implements the following callbacks:
 *
 * (1) setSessionId(sessionId)
 * (2) loginFailure(message)
 * (3) setLoading(boolean): Visual UI display that data is being retrieved from the network
 *
 * @param options
 * 
 */

SmugMugDataSource.prototype.login = function(options) {
    console.log("SmugMugDataSource.login");
    console.log(options);

    if (options.username && options.password && options.caller) {

        options.caller.setLoading(true);

        
        Ext.util.JSONP.request({
            url: this.SMUGMUG_API_URL,
            callbackKey: this.JSON_CALLBACK_NAME,
            params: {
                APIKey: this.SMUGMUG_API_KEY,
                method: this.SMUGMUG_LOGIN_METHOD,
                EmailAddress: options.username,
                Password: options.password,
                Callback: this.JSON_CALLBACK_NAME
            },
            callback: function(response) {

    console.log("FFF 4");
                if (response.stat && response.stat === 'ok') {

    console.log("FFF 5");
                    options.caller.setSessionId(response.Login.Session.id);
                } else {

    console.log("FFF 6");
                    options.caller.loginFailure("Failed to login.");
                }
            }
        });
    } else {
        options.caller.loginFailure("Username, password or caller not defined.");
    }
};

/**
 * Required parameters specified in the 'options' JSON object include the SmugMug sessionId and a caller
 * object that implements the following callbacks:
 *
 * (1) setAlbumList(albumList)
 * (2) handleError(message)
 * (3) setLoading(boolean): Visual UI display that data is being retrieved from the network
 *
 * @param options
 *
 */

SmugMugDataSource.prototype.getAlbumList = function(options) {
    console.log(options);

    if (options.sessionId && options.caller) {
        options.caller.setLoading(true);

        Ext.util.JSONP.request({
            url: this.SMUGMUG_API_URL,
            callbackKey: this.JSON_CALLBACK_NAME,
            params: {
                APIKey: this.SMUGMUG_API_KEY,
                method: this.SMUGMUG_ALBUMS_METHOD,
                SessionID: options.sessionId,
                Heavy: true,
                Callback: this.JSON_CALLBACK_NAME
            },
            callback: function(response) {
                console.log(response);
                if (response.stat && response.stat === 'ok') {
                    var albumList = response.Albums;
                    console.log(albumList);
                    options.caller.setAlbumList(albumList);
                } else {
                    options.caller.handleError("Failed to get album list.");
                }
            }
        });

    } else {
        options.caller.handleError("Session ID or caller not defined.");
    }
};

/**
 * Required parameters specified in the 'options' JSON object include the SmugMug sessionId, custom image size, album
 * key and album id returned in the getAlbumList method.  Additionally, a caller object is required that implements
 * the following callbacks:
 *
 * (1) setImageList(images)
 * (2) handleError(message)
 * (3) setLoading(boolean): Visual UI display that data is being retrieved from the network
 *
 * @param options
 *
 */

SmugMugDataSource.prototype.getImageList = function(options) {
    console.log(options);

    if (options.sessionId && options.albumKey && options.albumId && options.caller) {
        options.caller.setLoading(true);

        Ext.util.JSONP.request({
            url: SMUGMUG_API_URL,

            callbackKey: 'Ext.util.JSONP.callback',
            params: {
                APIKey: SMUGMUG_API_KEY,
                method: SMUGMUG_IMAGES_METHOD,
                SessionID: options.sessionId,
                AlbumID: options.albumId,
                AlbumKey: options.albumKey,
                Extras: 'ThumbURL,OriginalURL,LightboxURL,MediumURL,X2LargeURL,Video640URL',
                CustomSize: options.customSize,
                //Heavy: true,
                Callback: 'Ext.util.JSONP.callback'
            },
            callback: function(response) {
                if (response.stat && response.stat === 'ok') {
                    options.caller.setImageList(response.Album.Images);
                } else {
                    options.caller.handleError("Failed to get image list.");
                }
            }
        });
    } else {
        options.caller.handleError("Session id, album key, album id or caller not defined.");
    }
};

/**
 * Generate upload parameters for SmugMug
 * @param sessionId
 * @param albumId
 * @param fileName
 * @param fileSize
 */
SmugMugDataSource.prototype.generateUploadParameters = function(sessionId, albumId, fileName, fileSize) {
    return {
        'Keywords': this.UPLOAD_KEYWORDS,
        'Altitude': '400',
        'Latitude': '37.44885',
        'Longitude': '-122.158592',
        'Pretty': true,
        'ByteCount': fileSize,
        'FileName': fileName,
        'AlbumID': albumId,
        'SessionID': sessionId,
        'ResponseType': this.SMUGMUG_API_RESPONSE_TYPE,
        'Version': this.SMUGMUG_API_VERSION
    };
};

/**
 * Upload photo.  To be documented afterwards.
 * @param options
 */

SmugMugDataSource.prototype.uploadPhoto = function(options) {

    options.caller.setLoading(true);

    var sessionId = options.sessionId;
    var imageURI = options.imageURI;
    var albumId = options.albumId;

    var ft = new FileTransfer();
    var path = imageURI.fullPath;
    var name = imageURI.name;
    var params = generateUploadParameters(sessionId, albumId, name, imageURI.size);

    console.log("uploadPhoto " + path + ", NAME " + name + ", SIZE: " + imageURI.size);

    var options = new FileUploadOptions();
    options.fileKey = this.SMUGMUG_API_FILE_KEY;
    options.fileName = name;
    options.mimeType = this.SMUGMUG_API_MIME_TYPE;
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
        this.SMUG_MUG_UPLOAD_URL,
        photoTransferSuccess,
        photoTransferFailure,
        options
    );
};
