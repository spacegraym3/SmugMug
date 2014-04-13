PMCLab.views.Viewport = Ext.extend(Ext.TabPanel, {
	fullscreen: true,
	cardSwitchAnimation: 'slide',
	initComponent: function() {
		//put instances of cards into PMCLab.views namespace
		Ext.apply(PMCLab.views, {
			homeView: new PMCLab.views.HomeView(),
			smugMugAlbum: new PMCLab.views.SmugMugAlbum(),
			smugMugCoverFlow: new PMCLab.views.SmugMugCoverFlow(),
			map: new PMCLab.views.Mapcard(),
			rottenTomatoes: new PMCLab.views.RottenTomatoes(),
			twitter: new PMCLab.views.Twitter(),
			camera: new PMCLab.views.CameraView()
		});
		//put instances of cards into viewport
		Ext.apply(this, {
			tabBar: {
				dock: 'bottom',
				layout: {
					pack: 'center'
				}
			},
			items: [
				PMCLab.views.homeView,
				PMCLab.views.smugMugAlbum,
				PMCLab.views.smugMugCoverFlow,
				PMCLab.views.map,
				PMCLab.views.rottenTomatoes,
				PMCLab.views.twitter,
				PMCLab.views.camera
			]
		});
		PMCLab.views.Viewport.superclass.initComponent.apply(this, arguments);
	}
});
