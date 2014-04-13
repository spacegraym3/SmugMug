PMCLab.views.SMImageCoverFlowPanel = Ext.extend(Ext.Panel, {
    title: "Album Images",
    iconCls: "user",
    fullScreen: true,
    frame: true,
    layout: 'fit',
    id: 'smImageCoverFlowView',

    setCurrentAlbum: function(id, key) {
        this.currentAlbumId = id;
        this.currentAlbumKey = key;
    },

    getCurrentAlbumId: function() {
        return this.currentAlbumId;
    },

    getCurrentAlbumKey: function() {
        return this.currentAlbumKey;
    },

    setData: function(data) {
        this.data = data;
        this.getComponent('smImageListCoverView').getStore().loadData(data);
        this.getComponent('smImageListCoverView').refresh();
        this.doLayout();
    },

    getData: function() {
        return this.data;
    },

    items: [new Ext.ux.Cover({
        id: 'smImageListCoverView',
        layout: 'fit',
        itemCls: 'my-cover-item',
        itemTpl: [
        '<div>',
        //'<div class="company">{id}</div>',
        '<div class="image"><tpl if="image"><img width="100%" height="auto" src="{MediumURL}"></tpl></div>',
        '</div>'
        ],
        store: new Ext.data.Store({
            id: 'smCoverImageViewStore',
            model: 'SmugMugImage'
        }),
        activeItem: 2,
        listeners: {
            itemdoubletap: function() {
                console.log('itemdbltap', arguments);
            },
            itemtap: function(cover, idx) {
                console.log('itemtap', arguments);
                var selectedItemIndex = arguments[0].activeItem;
                var photoTile = new PhotoTile(_mainView.getImageListView().getComponent('smImageListCoverView').getStore().getAt(selectedItemIndex).data);
                photoTile.setIndex(selectedItemIndex);
                _mainView.showImageView(photoTile);
            },
            scope: this
        }
    })],

    getPhotoTileByIndex: function(index) {
        var nextPhotoTile = null;
        if (index > -1 && index < this.getData().length) {
            nextPhotoTile = new PhotoTile(this.getData()[index]);
            nextPhotoTile.setIndex(index);
        }
        return nextPhotoTile;
    },

    getNextImage: function(currentIndex) {
        return this.getPhotoTileByIndex(currentIndex + 1);
    },

    getPreviousImage: function(currentIndex) {
        return this.getPhotoTileByIndex(currentIndex - 1);
    },

    setImageList: function(data) {
        _mainView.setLoading(false);

        _mainView.showImageListView();
        this.setData(data);
        console.log(data);
    },

    listeners: {
        activate: function() {
            console.log("SmugMug Cover Flow activated");
        }
    },

    initComponent: function() {
        PMCLab.views.SMImageCoverFlowPanel.superclass.initComponent.apply(this, arguments);
    },

    clear: function() {

        }
});
