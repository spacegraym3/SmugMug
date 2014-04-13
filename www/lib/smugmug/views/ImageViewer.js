/**
 * Created by JetBrains WebStorm.
 * User: chriswhite
 * Date: 9/29/11
 * Time: 10:30 AM
 * To change this template use File | Settings | File Templates.
 */

PMCLab.views.SMImageViewPanel = Ext.extend(Ext.Panel, {
    style: "background-color:black;",
    centered: true,
    width: '100%',
    height: '100%',
    scroll: 'both',
    html: '<img style="display: block;margin-left: auto;margin-right: auto;width=auto;height=100%" id="sm_image_view"/>',
    draggable: false,
    frame: true,
    border: true,
    fullscreen: true,
    id: 'smImageView',
    initComponent: function() {
        PMCLab.views.SMImageViewPanel.superclass.initComponent.apply(this, arguments);
    },

    setPhotoTile: function(tile) {
        this.photoTile = tile;
    },

    getPhotoTile: function() {
        return this.photoTile;
    },

    listeners: {
        el: {
            tap: function() {
                //console.log("Tapped on image view panel");
                },
            swipe: function(e) {
                var tile = null;

                if (e.direction === 'right') {
                    tile = _mainView.getImageListView().getPreviousImage(_mainView.getImageView().getPhotoTile().getIndex());
                    console.log(tile);
                } else if (e.direction === 'left') {
                    tile = _mainView.getImageListView().getNextImage(_mainView.getImageView().getPhotoTile().getIndex());
                    console.log(tile);
                }
                if (tile != null) {
                    _mainView.showImageView(tile);
                }
            },
            doubletap: function() {
                //console.log("Double tap on image view panel");
                }
        },
        scope: this,
        afterrender: function(c) {
            if (_mainView !== null) {
                _mainView.setLoading(false);
            }
        }

    }
});
