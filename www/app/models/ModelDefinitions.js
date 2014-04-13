

Ext.regModel('YqlWeatherResult', {
    fields: [{
        name: 'condition',
		name: 'forecast',
		name: 'lat',
		name: 'long',
		name: 'pubDate',
		name: 'title',
		name: 'link'
    }]
});

Ext.regModel("Weather", {
    fields: [
        {name: "conidition",  type: "int"},
        {name: "description", type: "string"},
        {name: "forecast"},
        {name: "lat"},
        {name: "long"},
        {name: "link"},
        {name: "pubDate"},
        {name: "title"}
    ]
   // proxy: 'weatherProxy'
});
