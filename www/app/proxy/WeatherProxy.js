
var YAHOO_YQL_URL = 'http://query.yahooapis.com/v1/public/yql';
var YAHOO_WEATHER_QUERY = 'select item from weather.forecast where location=';
var YAHOO_JSON_FORMAT = 'json';
var zipCode = 94062;


Ext.data.WeatherProxy = Ext.extend(Ext.data.ScriptTagProxy, {
	url: YAHOO_YQL_URL,
    filterParam: undefined,
    extraParams: {
        q: YAHOO_WEATHER_QUERY + zipCode,
		format: YAHOO_JSON_FORMAT,
        callback: 'Ext.util.JSONP.callback'
    }
});

function myCallback(data) {
	console.log("******** data");
	console.log(data);
}

var w = new Ext.data.WeatherProxy();

w.read(new Ext.data.Operation({action:'read'}), myCallback, null);


Ext.data.ProxyMgr.registerType('weatherProxy', Ext.data.WeatherProxy);

