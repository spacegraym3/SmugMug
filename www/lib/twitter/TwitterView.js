/**
* @class twitter.views.TimeLine
* @extends Ext.List
*
* The TimeLine component is a very simple DataView which just defines a template, loading text and empty text. It is
* passed a Tweet store when rendered and simply displays each tweet next to the tweeter's image.
*
* In the configured template we render each tweet into a div, and at the bottom add a special 'nextPage' div. We set
* up a tap listener on that div to load the next page of data.
*

.tweet {
    padding: 10px 20px;
    font-size: 15px;
    position: relative;
    zoom: 1;
}

.tweet-content {
    margin-left: 58px;
    min-height: 48px;
}
.tweet-dogear {
    background: url(../img/tweet-dogear.png) no-repeat 24px 25px;
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 25px;
}
.tweet-image {
    float: left;
    height: 48px;
    overflow: hidden;
    width: 48px;
    margin-top: 3px;
}
.tweet-row {
    display: block;
    position: relative;
    line-height: 15px;
}
.tweet-screen-name {
    font-weight: bold;
    color: #333!important;
}
.tweet-full-name {
    color: #999;
    font-size: 12px;
}

.tweet-text {
    padding: 0;
    font-family: Arial,"Helvetica Neue",sans-serif;
    line-height: 19px;
    word-wrap: break-word;
}

.tweet-timestamp {
    color: #999!important;
    font-size: 11px;
}

*/

var twitterStore;
var twitterList;

var tpl = new Ext.XTemplate(
'<div style="padding: 10px 20px;font-size: 15px;position: relative;zoom: 1;">', // tweet CSS
    '<div style="position: absolute;top: 0;left: 0;width: 24px;height: 25px;"></div>', // tweet-dogear CSS
    '<div style="float: left;height: 48px;overflow: hidden;width: 48px;margin-top: 3px;">', // tweet-image CSS
        '<img height="48" width="48" src="{profile_image_url}" />',
    '</div>',
    '<div style="margin-left: 58px;min-height: 48px;">', // tweet-content CSS
        '<div style="display: block;position: relative;line-height: 20px;">', // tweet-row CSS
            '<span>',
                '<span style="font-weight: bold;color: #333!important;" >{from_user}</span>',
            '</span>',
        '</div>',
        '<div style="display: block;position: relative;line-height: 20px;">', // tweet-row CSS
            '<div style="padding: 0;font-family: Arial,"Helvetica Neue",sans-serif;line-height: 19px;word-wrap: break-word;">{text:this.linkify}</div>', // tweet-text CSS
        '</div>',
        '<div style="display: block;position: relative;line-height: 15px;">', // tweet-row CSS
            '<span style="color: #999!important;font-size: 11px;">{created_at}</span>', // tweet-text CSS
        '</div>', 
    '</div>',     
'</div>', 
    
    {
        linkify: function(value) {
            return value.replace(/(http:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
        },
        compiled: true
});


function loadTweets(requestType, searchTerms) {
    Ext.dispatch({
        controller: PMCLab.controllers.twitter,
        action: 'getTwitterMessages',
        requestType: requestType,
        lat: '37.44885',
		lon: '-122.158592',
		searchTerms: searchTerms
    });
}

function getTweets(btn) {
    var tweetRequest = btn.value;
    if (tweetRequest === TWITTER_SEARCH_TWEETS) {
        Ext.Msg.prompt('Twitter Search',
            null, 
            function(buttonValue, searchTerms) {
                if (buttonValue === 'ok') {
		            loadTweets(TWITTER_SEARCH_TWEETS, searchTerms);
                }
            },
            null,
            false,
            null,
            { 
                autocapitalize: true, 
                placeholder: 'Please enter search terms...' 
            });
    } else {
        loadTweets(tweetRequest, null);
    }
}

(function() {
	twitterStore = new Ext.data.Store({
        model: 'TwitterMessage'
    });

	twitterList = new Ext.List({
        store: twitterStore,
        layout: 'fit',
        itemTpl: tpl,
        cls: 'movie-bubble',
        loadingText: "Loading...",
        overItemCls: "x-view-over",
        itemSelector: 'td.thumb-wrap',
        emptyText: 'No images to display',
        listeners: {
            onItemTap: function(item, index, e) {
                console.log("tap");
            }
        }
    });
    PMCLab.views.Twitter = Ext.extend(Ext.Panel, {
        title: "twitter",
        iconCls: "compose",
        frame:true,
        autoHeight:true,
        collapsible:true,
        layout:'fit',
        listeners: {
            activate: function() {
			    loadTweets(TWITTER_LOCAL_TWEETS);
            }
        },
		loadData: function(data) {
			twitterStore.loadData(data, false);
		},
		handleError: function(errorMsg) {
            console.error(errorMsg);
        },
        initComponent: function() {
            Ext.apply(this, {
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    layout: {
                        pack: 'center'
                    },
                    items: [{
                        xtype: 'segmentedbutton',
                        items: [{
                            text: "Local Tweets",
                            value: TWITTER_LOCAL_TWEETS,
                            pressed: true,
                            handler: getTweets
                        },{
                            text: "Search",
                            value: TWITTER_SEARCH_TWEETS,
                            handler: getTweets
                        }]
                    }]
                }],
                title: 'twitter',
                items: [ twitterList ]
            });
            PMCLab.views.Twitter.superclass.initComponent.apply(this, arguments);
        }
    });
    Ext.reg('twitter', PMCLab.views.Twitter);
})();
