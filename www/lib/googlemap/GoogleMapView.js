var initializeLocation = true;

var MAP_ROADMAP_TYPE = google.maps.MapTypeId.ROADMAP;
var MAP_SATELLITE_TYPE = google.maps.MapTypeId.SATELLITE;
var MAP_HYBRID_TYPE = google.maps.MapTypeId.HYBRID;
var MAP_TERRAIN_TYPE = google.maps.MapTypeId.TERRAIN;

function getCurrentLocation(panel, extMap) {
	if (panel) {
		panel.setLoading(true);
	}

	var gmCallback = function(success, data) {
		if (panel) {
			panel.setLoading(false);
		}
		
		if (success) {
			console.log('Geo location lat=' + data.coords.latitude + ', long=' + data.coords.longitude);
			
			var myLocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);

			var marker = new google.maps.Marker({
				position: myLocation, 
				map: extMap.map, 
				title:"Hello World!"
			});

			console.log("Map update: " + data.coords.latitude+ " | " + data.coords.longitude);
			extMap.update(myLocation);
			
		} else {
			console.log('Geo location failed. Message: ' + data);
		}
	}
	
	Ext.dispatch({
        controller: 'location_controller',
        action: 'getCurrentLocation',
        locationCallback: gmCallback
    });
}

function createExtMap(coords) {

	var position;

	if (coords) {
		position = new google.maps.LatLng(coords.latitude, coords.longitude);
	} else {
		position = new google.maps.LatLng(37.44885, -122.158592);
	}

	infowindow = new google.maps.InfoWindow({
		content: 'Current Location'
	});

	//Tracking Marker Image
	image = new google.maps.MarkerImage('images/map/point.png',
		new google.maps.Size(32, 31),
		new google.maps.Point(0, 0),
		new google.maps.Point(16, 31)
	);

	shadow = new google.maps.MarkerImage('images/map/shadow.png',
	new google.maps.Size(64, 52),
	new google.maps.Point(0, 0),
	new google.maps.Point( - 5, 42)
	);

	trackingButton = Ext.create({
		xtype: 'button',
		iconMask: true,
		iconCls: 'locate'
	});

	toolbar = new Ext.Toolbar({
		dock: 'top',
		xtype: 'toolbar',
		ui: 'light',
		defaults: {
			iconMask: true
		},
		items: [
		{
			position: position,
			iconCls: 'home',
			handler: function() {
				//disable tracking
				trackingButton.ownerCt.setActive(trackingButton, false);
				extMap.map.panTo(this.position);
			}
		},
		{
			xtype: 'segmentedbutton',
			allowMultiple: true,
			listeners: {
				toggle: function(buttons, button, active) {
					if (button.iconCls === 'maps') {
						extMap.traffic[active ? 'show': 'hide']();
					} else if (button.iconCls === 'locate') {
						extMap.geo[active ? 'resumeUpdates': 'suspendUpdates']();
					}
				}
			},
			items: [
				trackingButton,
				{
					iconMask: true,
					iconCls: 'maps'
				}
			]
		}]
	});
	extMap = new Ext.Map({
		useCurrentLocation: true,
		mapOptions: {

			center: new google.maps.LatLng(37.381592, -122.135672),
			// Latitude and longitude nearby San Fran
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			navigationControl: true,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.DEFAULT
			}
		},

		plugins: [
			new Ext.plugin.GMap.Tracker({
				trackSuspended: true,
				//suspend tracking initially
				highAccuracy: false,
				marker: new google.maps.Marker({
					position: position,
					title: 'My Current Location',
					shadow: shadow,
					icon: image
				})
			}),
			new Ext.plugin.GMap.Traffic({
				hidden: true
			})
		],
		listeners: {
			maprender: function(comp, map) {
				var marker = new google.maps.Marker({
					position: position,
					title: 'Current Location',
					map: map
				});

				google.maps.event.addListener(marker, 'click',
				function() {
					infowindow.open(map, marker);
				});

				setTimeout(function() {
					map.panTo(position);
				},
				1000);
			}

		}
	});
	return extMap;
}

(function() {
	var extMap = createExtMap(null);
	PMCLab.views.Mapcard = Ext.extend(Ext.Panel, {
		title: "map",
		iconCls: "maps",
		styleHtmlContent: true,
		listeners: {
			activate: function () {
				if (initializeLocation) {
					initializeLocation = false;
					this.setLoading(true);
					getCurrentLocation(this, extMap);
				}
			}
		},

		initComponent: function() {
			Ext.apply(this, {
				dockedItems: [toolbar],
				title: 'map',
				items: [extMap]
			});
			PMCLab.views.Mapcard.superclass.initComponent.apply(this, arguments);
		}
	});
	Ext.reg('mapcard', PMCLab.views.Mapcard);
})();
