/**
 * Created by JetBrains WebStorm.
 * User: chriswhite
 * Date: 9/29/11
 * Time: 10:32 AM
 * To change this template use File | Settings | File Templates.
 */


PMCLab.views.SMAlbumListPanel = Ext.extend(Ext.Panel, {
    id: 'smAlbumListView',
    centered: true,
    layout: 'fit',
    scroll: 'vertical',
    items: [
    new Ext.List({
        id: 'smAlbumListExtList',
        store: new Ext.data.Store({
            id: 'smAlbumListStore',
            model: 'SmugMugAlbum',
            sorters: 'Title',
            getGroupString: function(record) {
                return record.get('Title')[0];
            }
        }),
        itemTpl: '<div><strong>{Title}</strong></div>',
        selModel: {
            mode: 'SINGLE',
            allowDeselect: true
        },

        scroll: 'vertical',
        grouped: true,
        indexBar: false,
        fullscreen: true,
        listeners: {
            selectionchange: function(selectModel, records) {

                if (records[0] !== undefined) {

                    _mainView.setLoading(true);

                    // Get the selected album key and Id
                    var albumKey = records[0].get('Key');
                    var albumId = records[0].get('id');

                    _mainView.getImageListView().setCurrentAlbum(albumId, albumKey);
                    // Retrieve the album image list
                    Ext.dispatch({
                        controller: _SMUGMUG_CONTROLLER,
                        action: 'getImageList',
                        sessionId: _mainView.getSessionId(),
                        albumKey: albumKey,
                        albumId: albumId,
                        customSize: _mainView.getCustomImageSize(),
                        caller: _mainView
                    });
                    _mainView.getAlbumListView().getComponent('smAlbumListExtList').deselect(records[0], true);
                }
            }
        }
    })
    ],
    listeners: {
        afterrender: function(c) {
            _mainView.setLoading(false);
        }
    },

    loadAlbumList: function(albumList) {
        this.getComponent('smAlbumListExtList').getStore().loadData(albumList, false);
        this.doLayout();
    },

    initComponent: function() {
        PMCLab.views.SMAlbumListPanel.superclass.initComponent.apply(this, arguments);
    }
});