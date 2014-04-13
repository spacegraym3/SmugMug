PMCLab.controllers.camera = new Ext.Controller({
	initialized: false,
	pictureSource: null,
	destinationType: null,
	
	initialize: function() {
		// Needs to be done after the device ready event has been received
		this.pictureSource = navigator.camera.PictureSourceType; 
		this.destinationType =navigator.camera.DestinationType;
		this.initialized = true;
	},
	
	// Called when a photo is successfully retrieved
	onPhotoDataSuccess: function(imageData) {
		// Uncomment to view the base64 encoded image data
		// console.log(imageData);

		// Get image handle
		//
		var smallImage = document.getElementById('smallImage');

		// Unhide image elements
		//
		smallImage.style.display = 'block';

		// Show the captured photo
		// The inline CSS rules are used to resize the image
		//
		smallImage.src = "data:image/jpeg;base64," + imageData;
	},
	
	// Called when a photo is successfully retrieved
	onPhotoURISuccess: function(imageURI) {
		// Uncomment to view the image file URI 
		// console.log(imageURI);

		// Get image handle
		//
		var largeImage = document.getElementById('largeImage');

		// Unhide image elements
		//
		largeImage.style.display = 'block';

		// Show the captured photo
		// The inline CSS rules are used to resize the image
		//
		largeImage.src = imageURI;
	},
	

    onFail: function(mesage) {
		alert('Failed because: ' + message);
	},
    
	// A button will call this function
	capturePhoto: function() {
		// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 50 });
	},
	
	// A button will call this function
	capturePhotoEdit: function() {
		// Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
		navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 20, allowEdit: true }); 
	},
	
	// A button will call this function
	getPhoto: function(source) {
		// Retrieve image file location from specified source
		navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { 
			quality: 50, 
			destinationType: destinationType.FILE_URI,
			sourceType: source 
		});
	}
});




//		</script>
//	</head>
//	<body onload="onLoad()">
//		<button onclick="capturePhoto();">Capture Photo</button> <br>
//		<button onclick="capturePhotoEdit();">Capture Editable Photo</button> <br>
//		<button onclick="getPhoto(pictureSource.PHOTOLIBRARY);">From Photo Library</button><br>
//		<button onclick="getPhoto(pictureSource.SAVEDPHOTOALBUM);">From Photo Album</button><br>
//		<img style="display:none;width:60px;height:60px;" id="smallImage" src="" />
//		<img style="display:none;" id="largeImage" src="" />
//	</body>
//	</html>
