var MO_TYPE_UNKNOWN     = -1;
var MO_TYPE_PHOTO       = 1000;
var MO_TYPE_VIDEO       = 2000;
var MO_TYPE_MUSIC       = 3000;
var MO_TYPE_EBOOK       = 4000;
var MO_TYPE_PERIODICAL  = 5000;
var MO_TYPE_APPLICATION = 6000;
var MO_TYPE_CONTACT     = 7000;

function ContentObject() {
    this.name = '';
	this.type = MO_TYPE_UNKNOWN;

    this.assetURL = '';
	this.thumbnailURL = '';
	this.fullscreenURL = '';

    this.dateCreated = new Date(); // Store created media object time

    this.metadata;
    this.supportedActions = [];
};

ContentObject.prototype.setName = function(name) {
	this.name = name;
};

ContentObject.prototype.getName = function() {
	return this.name;
};

ContentObject.prototype.setName = function(name) {
	this.name = name;
};

ContentObject.prototype.getName = function() {
	return this.name;
};

ContentObject.prototype.setAssetURL = function(assetURL) {
	this.assetURL = assetURL;
};

ContentObject.prototype.getAssetURL = function() {
	return this.assetURL;
};

ContentObject.prototype.setThumbnailURL = function(thumbnailURL) {
	this.thumbnailURL = thumbnailURL;
};

ContentObject.prototype.getThumbnailURL = function() {
	return this.thumbnailURL;
};

ContentObject.prototype.setFullScreenURL = function(fullscreenURL) {
	this.fullscreenURL = fullscreenURL;
};

ContentObject.prototype.getFullScreenURL = function() {
	return this.fullscreenURL;
};

ContentObject.prototype.setType = function(type) {
	this.type = type;
};

ContentObject.prototype.getType = function() {
	return this.type;
};

ContentObject.prototype.setMetadata = function(metadata) {
	this.metadata = metadata;
};

ContentObject.prototype.getMetadata = function() {
	return this.metadata;
};

ContentObject.prototype.setSupportedActions = function(actionArray) {
    this.supportedActions = actionArray;
};

ContentObject.prototype.getSupportedActions = function() {
	return this.supportedActions;
};

// TODO: Determine a more efficient method to find whether an action is supported
ContentObject.prototype.isActionSupported = function(action) {
    var ret = false;

    var x = 0;
    for (;x < this.supportedActions.length;x++) {
        if (action === this.supportedActions[x]) {
            ret = true;
            break;
        }
    }
    return ret;
};

/**
 * Media object default action methods
 */

ContentObject.prototype.display = function() {
	// Need to determine how to override the display method depending on the media object type
};

ContentObject.prototype.play = function() {
    // Need to determine how to override the play method
};

ContentObject.prototype.remove = function() {
    // Determine what this means in the context of remote versus local
};

ContentObject.prototype.sync = function() {
    // Synchronize local object with remote object
};

ContentObject.prototype.persist = function() {
    // Store the object locally
};
