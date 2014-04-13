Ext.regController('location_controller', {
    getCurrentLocation: function(options) {
        if (options) {

            // Error callback function telling the user that there was a problem retrieving GPS.
            var onGeoLocationFailure = function(error) {
            	console.error("Failed to get GPS location");
				options.locationCallback(false, error);
            };

            // Success callback function that will grab coordinate  and display it in an alert.
            var onGeoLocationSuccess = function(p) {
            	console.log("Succcess: " + p.coords.latitude + "|" + p.coords.longitude);
				options.locationCallback(true, p);
            };

            if (navigator.geolocation) {
                // Now make the PhoneGap JavaScript API call, passing in success and error callbacks as parameters, respectively.
                navigator.geolocation.getCurrentPosition(onGeoLocationSuccess, onGeoLocationFailure);
            } else {
                onGeoLocationFailure('Location services not supported.');
            }
        }
    }
});

