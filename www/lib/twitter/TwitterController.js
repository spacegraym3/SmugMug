
PMCLab.controllers.twitter = new Ext.Controller({
    getTwitterMessages: function(options) {
        PMCLab.views.twitter.setLoading(true);
        
		console.log("OPTIONS: " + options.lat + ", " + options.lon + ",1mi / " + TWITTER_SEARCH_URL);
		var params = {
            callback: 'Ext.util.JSONP.callback',
            rpp: 40,
			page: 1
		};
		
		if (options.requestType === TWITTER_LOCAL_TWEETS) {
		    params.geocode = options.lat + "," + options.lon + ",1mi";
		} else if (options.requestType === TWITTER_SEARCH_TWEETS) {
		    params.q = options.searchTerms;
		} else {    
                    PMCLab.views.twitter.setLoading(false);
		    PMCLab.views.twitter.handleError("Unknown Twitter request type: " + options.requestType);
		    return;
		}
		
		Ext.util.JSONP.request({
		    url: TWITTER_SEARCH_URL,
		    callbackKey: 'Ext.util.JSONP.callback',
		    params: params,
		    callback: function(response) {
				var res = response.results;
				console.log(res);
				if (res) {
					PMCLab.views.twitter.loadData(res);
				} else {
					PMCLab.views.twitter.handleError("Unable to get twitter messages");
				}
				PMCLab.views.twitter.setLoading(false);
                
		    }
		});
	},
	getGeoLocation: function (options) {
		if (options) {
			
			// Error callback function telling the user that there was a problem retrieving GPS.
			var onFail = function(error) {
				console.error("Failed to get GPS location"); 
			};

			// Success callback function that will grab coordinate  and display it in an alert.
			var onSuccess = function(p) {
				console.log("Succcess: " + p.coords.latitude + "|" + p.coords.longitude);
			};

			console.log("Geo Location? " + navigator.geolocation);

			if (navigator.geolocation) {
				// Now make the PhoneGap JavaScript API call, passing in success and error callbacks as parameters, respectively.
				navigator.geolocation.getCurrentPosition(onSuccess, onFail);
			} else {
				onFail();
			}
		}
	}
});
