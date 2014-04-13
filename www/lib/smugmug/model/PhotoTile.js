function PhotoTile(imageMetadata, x, y) {
	this.imageMetadata = imageMetadata;
	this.width = this.imageMetadata.width;
	this.height = this.imageMetadata.height;
	this.xPosition = x;
	this.yPosition = y;
	this.image;
	this.initialized = false;
}

PhotoTile.prototype.getImage = function() {
	if (this.image == null) {
		this.image = new Image();
	}
	return this.image;
};

PhotoTile.prototype.setImageSource = function(src) {
	this.initialized = true;
	this.getImage().src = src;
};

PhotoTile.prototype.isInitialized = function() {
	return this.initialized ;
};


PhotoTile.prototype.getImageMetadata = function() {
	return this.imageMetadata;
};

PhotoTile.prototype.getX = function() {
	return this.xPosition;
};

PhotoTile.prototype.getY = function() {
	return this.yPosition;
};

PhotoTile.prototype.setXY = function(xPosition, yPosition) {
	this.xPosition = xPosition;
	this.yPosition = yPosition;
};

PhotoTile.prototype.getWidth = function() {
	return this.width;
};

PhotoTile.prototype.getHeight = function() {
	return this.height;
};

PhotoTile.prototype.setIndex = function(mIndex) {
	return this.mIndex = mIndex;
};

PhotoTile.prototype.getIndex = function() {
	return this.mIndex;
};

