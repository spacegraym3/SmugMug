Ext.regApplication({
    launch: function() {
        Ext.regModel('ImageInfo', {
            fields: ['name', 'image']
        });

        var store = new Ext.data.JsonStore({
            model: 'ImageInfo',

            data: [
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6504/1001539444_7h3Ra-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6505/1001546139_oZRbo-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6567/1001588751_rPXMT-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG7134/1001829898_L9LMx-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6706/1001672837_5Zww3-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6699/1001679614_T9Ud7-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6745/1001702715_8MFyK-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6826/1001748020_DabdD-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            },
            {
                name: 'SmugMug',
                image: 'http://spacegray.smugmug.com/Sports/2010-Hockenheim-Formula-1/IMG6946/1001800201_GoLFv-L.jpg'
            }
                        ]
        });
        		//_mainViewportWidth = _mainView.getWidth();
    			//_mainViewportHeight = _mainView.getHeight();
    			

        var cover = new Ext.ux.Cover({
            itemCls: 'my-cover-item',
            //These are just for demo purposes.
            //height: '1000',
            //width: '1000',
            //end-demo
            itemTpl: [
                '<div>',
                '<div class="company">{name}</div>',
                '<div class="image"><tpl if="image"><img width="100%" height="auto" src="{image}"></tpl></div>',
                '</div>'
            ],
            store: store,
            activeItem: 2,
            listeners: {
                itemdoubletap: function() {
                    console.log('itemdbltap', arguments);
                },
                itemtap: function(cover, idx) {
                    console.log('itemtap', arguments);
                    if (cover.activeItem !== idx) {
                        cover.setActiveItem(idx);
                    }
                },
                scope: this
            }
        });


        new Ext.TabPanel({
            fullscreen: true,
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            items: [{
                title: 'cover',
                iconCls: 'favorites',
                //Demo purpose
                layout: 'fit',
                //end demo
                items: [cover]
            }]
        })
    }
});
