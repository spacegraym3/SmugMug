
PMCLab.views.HomeView = Ext.extend(Ext.Panel, {
    title: "home",
    iconCls: "home",
    styleHtmlContent: true,
	fullScreen: true,
    listeners: {
        activate: function() {
            Ext.dispatch({
                controller: 'weather_controller',
                action: 'getWeather',
                zipCode: 94062
            });
        }
    },
    updateHomeContent: function(content) {
        this.update(content);
    },
    initComponent: function() {
	    Ext.apply(this, {
		    dockedItems: [{
		        id: 'homeToolbar',
			    xtype: 'toolbar',
		        dock: 'top',
		        layout: {
		            pack: 'left'
		        },
		        items: [{
		            ui: 'action',
		            text: "Refresh",
		            handler: function() {
		                console.log("Refresh");
		            }
		        }]
		    }]
        });
        PMCLab.views.HomeView.superclass.initComponent.apply(this, arguments);
    }
});
