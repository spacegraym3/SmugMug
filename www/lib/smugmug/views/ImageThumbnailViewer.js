/**
 * Created by JetBrains WebStorm.
 * User: chriswhite
 * Date: 9/28/11
 * Time: 1:38 PM
 * To change this template use File | Settings | File Templates.
 */


PMCLab.views.SMImageThumbnailView = Ext.extend(Ext.Panel, {
    style: "background-color:#000000;",
    fullscreen: true,
    margin: '0 0 0 0',
    scroll: 'both',
    html: '<h1>Hello</h1>&nbsp;',
    id: 'smImageThumbnailView',

    setCurrentAlbum: function(id, key) {
        this.currentAlbumId = id;
        this.currentAlbumKey = key;
    },

    getCurrentAlbumId: function() {
        return this.currentAlbumId;
    },

    getCurrentAlbumKey: function() {
        return this.currentAlbumKey;
    },

    initComponent: function() {
        this.scrollStartY = -1;
        PMCLab.views.SMImageThumbnailView.superclass.initComponent.apply(this, arguments);
    },

    setLastRenderedRow: function(row) {
        this.lastRenderedRow = row;
    },

    getLastRenderedRow: function() {
        return this.lastRenderedRow;
    },

    getImageRowArray: function() {
        if (!this.imageRowArray) {
            this.imageRowArray = [];
        }
        return this.imageRowArray;
    },

    setThumbnailImageWidth: function(width) {
        this.thumbnailWidth = width;
    },

    getThumbnailImageWidth: function() {
        return this.thumbnailWidth;
    },

    setThumbnailImageHeight: function(height) {
        this.thumbnailHeight = height;
    },

    getThumbnailImageHeight: function() {
        return this.thumbnailHeight;
    },

    handleSelectionEvent: function(xCoor, yCoor) {
        if (yCoor >= 0 && this.getThumbnailImageHeight() > 0) {
            var clickedRow = divideAndRoundUp(yCoor, this.getThumbnailImageHeight());

            // Does this row exist (been rendered)?
            if (clickedRow <= this.getLastRenderedRow()) {

                var clickedCol = divideAndRoundUp(xCoor, this.getThumbnailImageWidth());
                // Adjusting row/col number since the first array element has an index of 0
                clickedRow--;
                clickedCol--;
                if (this.getImageRowArray()[clickedRow][clickedCol] !== null) {
                    _mainView.showImageView(this.getImageRowArray()[clickedRow][clickedCol]);
                }
            }
        }
    },

    setMaximumImagesPerRow: function(max) {
        this.maxImagePerRow = max;
    },

    getMaximumImagesPerRow: function() {
        return this.maxImagePerRow;
    },
    /*
	 * This method is a test method that does not draw the images to the canvas until they have
	 * all been loading.  The draw back of this method is that the user has no idea whether the
	 * operation is working or failing.  By default, this may not be a good idea.
	 */
    loadImages: function(canvasContext, photoTileArray) {
        if (photoTileArray !== null && photoTileArray.length > 0) {

            var loadedImages = 0;
            var numImages = photoTileArray.length;
            var imageRowIndex = this.getCurrentImageRowIndex();

            var z = 0;
            for (; z < photoTileArray.length; z++) {
                var photoTile = photoTileArray[z];
                photoTile.setXY(this.currentX, this.currentY);

                imageRowIndex++;
                if (imageRowIndex >= this.getMaximumImagesPerRow()) {
                    this.currentY += this.getThumbnailImageHeight();
                    this.currentX = 0;
                    imageRowIndex = 0;
                } else {
                    this.currentX += this.getThumbnailImageWidth();
                }

                photoTile.getImage().onload = function() {
                    loadedImages++;
                    canvasContext.drawImage(photoTile.getImage(), photoTile.getX(), photoTile.getY());
                    if (loadedImages >= numImages) {
                        _mainView.setLoading(false);
                    }
                };
                photoTile.getImage().src = photoTile.getImageMetadata().ThumbURL;
            }
            this.setCurrentImageRowIndex(imageRowIndex);
        }
    },

    setRenderQueueLength: function(len) {
        this.renderQueueLength = len;
    },

    getRenderQueueLength: function() {
        return this.renderQueueLength;
    },

    setCurrentImageRowIndex: function(index) {
        this.currentImageRowIndex = index;
    },

    getCurrentImageRowIndex: function() {
        return this.currentImageRowIndex;
    },

    draw: function(canvasContext, photoTile) {
        photoTile.getImage().onload = function() {
            var tile = photoTile;
            canvasContext.drawImage(tile.getImage(), tile.getX(), tile.getY());
            _mainView.getImageListView().renderQueueLength--;

            if (_mainView.getImageListView().getRenderQueueLength() === 0) {
                _mainView.setLoading(false);
            }
        };
        photoTile.getImage().src = photoTile.getImageMetadata().ThumbURL;
    },

    /*
	 * This method is a loads images as they are uploaded.  While this may not be
	 * the most efficient, it does provide feedback to the user.
	 */

    drawImagesOnCanvas: function(canvasContext, photoTileArray) {
        if (photoTileArray !== null && photoTileArray.length > 0) {
            this.setRenderQueueLength(photoTileArray.length);

            var imageRowIndex = this.getCurrentImageRowIndex();

            var z = 0;
            for (; z < photoTileArray.length; z++) {
                photoTileArray[z].setXY(this.currentX, this.currentY);

                this.draw(canvasContext, photoTileArray[z]);

                imageRowIndex++;

                if (imageRowIndex >= this.getMaximumImagesPerRow()) {
                    this.currentY += this.getThumbnailImageHeight();
                    this.currentX = 0;
                    imageRowIndex = 0;
                } else {
                    this.currentX += this.getThumbnailImageWidth();
                }
            }
            this.setCurrentImageRowIndex(imageRowIndex);
        }
    },

    setCurrentX: function(x) {
        this.currentX = x;
    },

    getCurrentX: function() {
        return this.currentX;
    },

    setCurrentY: function(y) {
        this.currentY = y;
    },

    getCurrentY: function() {
        return this.currentY;
    },

    setMaximumRowsPerPage: function(max) {
        this.maximumRowsPerPage = max;
    },

    getMaximumRowsPerPage: function() {
        return this.maximumRowsPerPage;
    },

    getPhotoTileByIndex: function(index) {
        var nextPhotoTile = null;

        if (index > -1) {
            var row = Math.floor(index / this.getMaximumImagesPerRow());
            var col = index % this.getMaximumImagesPerRow();

            if (this.getImageRowArray() && this.getImageRowArray()[row] && this.getImageRowArray()[col]) {
                nextPhotoTile = this.getImageRowArray()[row][col];
            }
        }
        return nextPhotoTile;
    },

    getNextImage: function(currentIndex) {
        return this.getPhotoTileByIndex(currentIndex + 1);
    },

    getPreviousImage: function(currentIndex) {
        return this.getPhotoTileByIndex(currentIndex - 1);
    },

    setTotalImageRows: function(total) {
        this.totalImageRows = total;
    },

    getTotalImageRows: function() {
        return this.totalImageRows;
    },

    setImageList: function(data) {
        if (data && data.length > 0) {


            // Reset current Y for the canvas painting operation
            this.setCurrentX(0);
            this.setCurrentY(0);
            this.setCurrentImageRowIndex(0);
            this.setLastRenderedRow(0);

            this.scroller.scrollTo(0, 0);

            // Set the album image view panel as the active item to trigger
            // a layout in order to get the size of the viewport
            _mainView.showImageListView();

            // Load first image and get the thumbnail size.  All SmugMug thumbnails
            // are the same size.
            var dataLength = data.length;
            var myImage = new Image();
            myImage.onload = function() {

                var _this = _mainView.getImageListView();

                // All SmugMug thumbnails are the same size and do need to reset the image height/width after the first instance.
                _this.setThumbnailImageWidth(myImage.width);
                _this.setThumbnailImageHeight(myImage.height);

                // Determine the needed canvas size
                _this.setMaximumImagesPerRow(divideAndRoundUp(_mainView.getMainViewportWidth(), _this.getThumbnailImageWidth()));

                // Determine total number of rows
                _this.setTotalImageRows(divideAndRoundUp(data.length, _this.getMaximumImagesPerRow()));

                // Determine total size of canvas
                var canvasWidth = _this.getMaximumImagesPerRow() * _this.getThumbnailImageWidth();
                var canvasHeight = _this.getTotalImageRows() * _this.getThumbnailImageHeight();

                // Determine total number of images per page / viewport
                _this.setMaximumRowsPerPage(divideAndRoundUp(_mainView.getMainViewportHeight(), _this.getThumbnailImageHeight()));

                // Set the viewport bottom (Y coordinate)
                _this.setMainViewportBottomY(_mainView.getMainViewportHeight());

                console.log("\n\nCanvas\n\twidth=" + canvasWidth + "\n\theight=" + canvasHeight);
                console.log("Viewport\n\twidth=" + _mainView.getMainViewportWidth() + "\n\theight=" + _mainView.getMainViewportHeight());
                console.log("Image\n\twidth=" + _this.getThumbnailImageWidth() + "\n\theight=" + _this.getThumbnailImageHeight() + "\n\n");
                console.log("Maximum Rows Per Page=" + _this.getMaximumRowsPerPage() + "\n\n");

                // Process the list
                var imageRowArray = _this.getImageRowArray();
                imageRowArray.length = 0;
                // Clear existing image row array
                var albumImages = [];
                var len = data.length;
                var i;

                var rowArray = null;
                var rowIndex = 0;
                var rowArrayIndex = 0;

                for (i = 0; i < len; ++i) {
                    // Start the next row if needed
                    if (rowArrayIndex >= _this.getMaximumImagesPerRow()) {
                        rowIndex++;
                        rowArrayIndex = 0;
                    }

                    // Create a new array if first element
                    if (rowArrayIndex === 0) {
                        imageRowArray[rowIndex] = [];
                    }

                    // Assign image to a row
                    imageRowArray[rowIndex][rowArrayIndex] = new PhotoTile(data[i]);
                    imageRowArray[rowIndex][rowArrayIndex].setIndex(i);
                    rowArrayIndex++;
                }

                _this.setCanvasDimensions(canvasWidth, canvasHeight);
                _this.renderImages(_this.getMaximumRowsPerPage());
            };
            myImage.src = data[0].ThumbURL;
        }
    },

    setMainViewportBottomY: function(y) {
        this.viewportBottomY = y;
    },

    getMainViewportBottomY: function() {
        return this.viewportBottomY;
    },

    setCanvasContext: function(context) {
        this.canvasContext = context;
    },

    getCanvasContext: function() {
        return this.canvasContext;
    },

    setCanvasDimensions: function(width, height) {
        // There appears to be an issue if a canvas is created that is too large.
        // Not sure if this is a memory issue or just the time it takes for the canvas to be
        // created.
        if (height > 4000) {
            console.error("Limiting canvas size to 4000 until it is determined what causes large image sets to fail during the thumbnail painting phase.");
            height = 4000;
        }

        this.canvasWidth = width;
        this.canvasHeight = height;
        var comp = _mainView.getImageListView();
        var ctx = comp.getCanvasContext();
        if (ctx == null) {
            comp.update('<canvas  style="background-color:#000000" id="myDrawing" width="' + this.canvasWidth + '" height="' + this.canvasHeight + '"><p>Canvas not supported!</p></canvas>');
            comp.setCanvasContext(document.getElementById('myDrawing').getContext('2d'));
        } else {
            ctx.canvas.width = this.canvasWidth;
            ctx.canvas.height = this.canvasHeight;
        }
    },

    getCanvasWidth: function() {
        return this.canvasWidth;
    },

    getCanvasHeight: function() {
        return this.canvasHeight;
    },

    renderImages: function(targetLastRow) {
        var lastRenderedRow = this.getLastRenderedRow();
        console.log("\n\n===============================================================\n\tLast rendered row: " + this.getLastRenderedRow() + "\n\tRendering up to row: " + targetLastRow + "\n\tTotal Image Rows: " + this.getTotalImageRows());

        if (lastRenderedRow < targetLastRow && lastRenderedRow < this.getTotalImageRows()) {

            var rowIndex = lastRenderedRow;
            var imageRowArray = this.getImageRowArray();

            var len = imageRowArray.length;
            var tmpArray = [];

            for (; lastRenderedRow < targetLastRow && rowIndex < len; rowIndex++) {
                var arrayIndex = 0;
                for (; arrayIndex < imageRowArray[rowIndex].length; arrayIndex++) {
                    tmpArray.push(imageRowArray[rowIndex][arrayIndex]);
                }
                lastRenderedRow++;

            }
            this.setLastRenderedRow(lastRenderedRow);
            this.drawImagesOnCanvas(_mainView.getImageListView().getCanvasContext(), tmpArray);
        } else {
            console.log("No more images to render.");
            _mainView.setLoading(false);
        }
    },

    clear: function() {
        var comp = _mainView.getImageListView();
        var ctx = this.getCanvasContext();
        if (comp != null && ctx !== null) {
            ctx.clearRect(0, 0, comp.getCanvasWidth(), comp.getCanvasHeight());
        }
    },

    onScrollStart: function(scroll, event) {
        },

    onScrollEnd: function(scroll, offsets) {
        var _this = _mainView.getImageListView();
        var normalizedOffsetY = offsets.y - _this.scrollStartY;
        _this.scrollStartY = -1;

        // TODO: Determine how to more accurately measure the start Y.  When scrolling to the top of the
        // panel, the normalized offset still returns a positive causing irregularities in the computing of the
        // viewport bottom Y coordinate.
        _this.setMainViewportBottomY(_this.getMainViewportBottomY() + normalizedOffsetY);

        var lastVisibleRow = divideAndRoundUp(_this.getMainViewportBottomY(), _this.getThumbnailImageHeight());

        if (lastVisibleRow >= _mainView.getImageListView().getLastRenderedRow()) {
            _mainView.setLoading(true);
            _mainView.getImageListView().renderImages(lastVisibleRow);
        }

    },
    onScroll: function(scroll, offsets) {

        var _this = _mainView.getImageListView();
        if (_this.scrollStartY === -1) {
            _this.scrollStartY = offsets.y;
        }
    },
    listeners: {
        render: function(c) {
            c.scroller.on('scrollend', this.onScrollEnd);
            c.scroller.on('scrollstart', this.onScrollStart);
            c.scroller.on('scroll', this.onScroll);
            c.el.on('tap',
            function(event, html, obj) {
                // Y Coordinate adjusted for the toolbar
                var yCoor = event.pageY - _mainView.getToolbarHeight();
                var xCoor = event.pageX;

                // Add the relative height of the window to the equation
                yCoor += (_mainView.getImageListView().getMainViewportBottomY() - _mainView.getMainViewportHeight());

                _mainView.getImageListView().handleSelectionEvent(xCoor, yCoor);
            });

        }
    }
});
