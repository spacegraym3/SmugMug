var listInitialized = false;
var rtPanel;
var rtDataView;
var rtMovieStore;


var tpl = new Ext.XTemplate(
	'<tpl for=".">',
		'<div class="thumb">',
			'<div class="thumb-wrap" width="100&">',
				'<img src="{posters.thumbnail}" style="float: left" >',
					'&nbsp;<span style="padding: 5px;font-size:150%;"><b>{title}</b></span><br>',
					'&nbsp;<span style="padding: 5px"><i>{runtime} mins / {year}</i></span><br>',
					'&nbsp;<span style="padding: 5px">Critics: {ratings.critics_score} / Audience: {ratings.audience_score}</span><br>',
				'</div>',
			'</div>',
        '</tpl>',
    '<div class="x-clear"></div>',{
    compiled: true
});

function getMovieList(index) {
    if (rtPanel) {
		rtPanel.setLoading(true);
	}
    Ext.dispatch({
        controller: PMCLab.controllers.movies,
        action: 'displayMovieList',
        urlIndex: index
    });
}

function requestMovieList(btn) {
    var movieIndex = btn.value;
    getMovieList(movieIndex);
}
function showMoviePopup(movie) {
    var popup = new Ext.Panel({
        floating: true,
        modal: true,
        centered: true,
        width: '80%',

        styleHtmlContent: true,
        //scroll: 'vertical',
        html: '<table><tr><td><img src="' + movie.data.posters.detailed + '"></td><td>' + movie.data.synopsis + '</td></tr></table>',
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            title: movie.data.title
        }]
    });
    popup.show('pop');
}

var rtMovieStore = new Ext.data.Store({
    model: 'RottenTomatoesMovie'
});

var rtDataView = new Ext.List({
       store: rtMovieStore,
    layout: 'fit',
    itemTpl: tpl,
    loadingText: "Loading...",
    //itemSelector: 'thumb-wrap',
    emptyText: 'No images to display',
    listeners: {
        selectionchange: function(selectModel, records) {
            if (records[0] !== undefined) {
                showMoviePopup(records[0]);
            }
        }
    }
});

PMCLab.views.RottenTomatoes = Ext.extend(Ext.Panel, {
    title: "movies",
    iconCls: "favorites",
	fullscreen: true,
    frame:true,
    collapsible:true,
    layout:'fit',
    listeners: {
        activate: function() {
			getMovieList(RT_BOX_OFFICE);
        }
    },
    handleError: function(errorMsg) {
        console.error(errorMsg);
        if (rtPanel) {
			rtPanel.setLoading(false);
		}
    },
    loadData: function(data) {
		console.log("DATA");
		console.log(data);
        rtMovieStore.loadData(data, false);
        if (rtPanel) {
			rtPanel.setLoading(false);
		}
    },
    initComponent: function() {
        rtPanel = this;
        Ext.apply(this, {
            fullscreen: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                layout: {
                    pack: 'center'
                },
                items: [{
                    xtype: 'segmentedbutton',
                    items: [{
                        text: "Box Office",
                        value: RT_BOX_OFFICE,
                        pressed: true,
                        handler: requestMovieList
                    },{
                        text: "In Theater",
                        value: RT_IN_THEATER,
                        handler: requestMovieList
                    },{
                        text: "Opening",
                        value: RT_OPENING,
                        handler: requestMovieList
                    },{
                        text: "Upcoming",
                        value: RT_UPCOMING,
                        handler: requestMovieList
                    },{
                        text: "DVD",
                        value: RT_DVD,
                        handler: requestMovieList
                    }]
                }]
            }],
            title: 'movies',
            items: [ rtDataView ]
        });
        PMCLab.views.RottenTomatoes.superclass.initComponent.apply(this, arguments);
    }
});