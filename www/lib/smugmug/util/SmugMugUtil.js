	
function divide(op1, op2) {
	var i = op1/op2;
	var j = (op1%op2)/op2;
	return (i-j);
}
	
function divideAndRoundUp(op1, op2) {
	var val = divide(op1, op2);
	if ((op1 % op2) !== 0) {
		val++;
	}
	return val;
}

var imageQueueUtil = {
	done: function() {
		this.onComplete();
	},
    onComplete: function() {}
    // Fires when all finished loading
    ,
    onLoaded: function() {}
    // Fires when an image finishes loading
    ,
    current: null
    // Last loaded image (Image Object)
    ,
    qLength: 0
    // the queue length before process_queue
    ,
    images: []
    // Loaded images (array of Image Object)
    ,
    inProcess: false
    // a flag to indicate if in process_queue
    ,
    queue: []
    // Waiting to be processed (array of strings (urls for Image SRC))
    ,
    queue_images: function(arg) {
		this.images.length = 0;
		this.qLength = 0;
		this.current = null;
		this.queue = arg;
    }
    ,
    process_queue: function() {
        // start loading images from the queue
        this.inProcess = true;
        this.qLength += this.queue.length;
        while (this.queue.length > 0) {
            this.load_image(this.queue.shift());
            //pull the next image off the top and load it
        }
        this.inProcess = false;
    }
    ,
    load_image: function(photoTile) {
        // load a single by a url and continue to process the queue
        var th = this;
        photoTile.getImage().onload = function() {
	
			console.log("LOAD IMAGE ONLOAD");
            // After user agent has the image
            th.current = photoTile;

					console.log("LOAD IMAGE ONLOAD 1");
            // set the current
            th.images.push(photoTile);

			console.log("LOAD IMAGE ONLOAD 3");
            // add the image to the stack
            (th.onLoaded)();

			console.log("LOAD IMAGE ONLOAD 4");
            //fire the onloaded
            if (th.queue.length > 0 && !th.inProcess) {
                th.process_queue();
                // make sure other items are loaded!
            }

            if (th.qLength === th.images.length) {
                // all images loaded?
                (th.done)();
                // call callback
            }
        }; 
        photoTile.getImage().src = photoTile.getImageMetadata().ThumbURL;
    }
};
