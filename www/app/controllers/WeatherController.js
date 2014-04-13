var YAHOO_YQL_URL = 'http://query.yahooapis.com/v1/public/yql';
var YAHOO_WEATHER_QUERY = 'select item from weather.forecast where location=';
var YAHOO_JSON_FORMAT = 'json';
var JSON_CALLBACK_NAME = 'Ext.util.JSONP.callback';

Ext.regController('weather_controller', {
    getWeather: function(options) {
	
		console.log(options);

		if (options) {
			Ext.util.JSONP.request({
			    url: YAHOO_YQL_URL,
		        callbackKey: JSON_CALLBACK_NAME,
		        params: {
		            q: YAHOO_WEATHER_QUERY + options.zipCode,
					format: YAHOO_JSON_FORMAT,
		            callback: JSON_CALLBACK_NAME
		        },
		        callback: function(response) {

					if (response) {
						console.log(response);
						var weatherResult = response.query.results.channel.item.description;
						PMCLab.views.homeView.updateHomeContent(weatherResult);
					}
		        }
		    });
		}
	}
});
