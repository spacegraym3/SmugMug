var _mainView = null;
var PMC_GALLERY_ALBUM_ID = '18012333';
var _SMUGMUG_CONTROLLER = 'smug_mug_controller';




PMCLab.views.SmugMugAlbum = Ext.extend(Ext.Panel, {

    fullscreen: true,
    layout: 'card',
    cardAnimation: 'slide',
    margin: '0 0 0 0',
    title: 'SmugMug',
    iconCls: "user",

    getAlbumListView: function() {
        return this.getComponent('smAlbumListView');
    },

    getImageListView: function() {
        return this.currentImageListPanel;
    },

    getImageView: function() {
        return this.getComponent('smImageView');
    },

    getVideoView: function() {
        return this.getComponent('smVideoView');
    },


    onImageCapture: function(mediaFiles) {
        var i,
        len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {

            console.log("onImageCapture URI: " + mediaFiles[i] + "/" + _mainView);
            console.log("onImageCapture URI: " + _mainView.getSessionId());
            console.log("onImageCapture URI: " + _mainView.getImageListView().getCurrentAlbumId());
            Ext.dispatch({
                controller: _SMUGMUG_CONTROLLER,
                action: 'uploadPhoto',
                sessionId: _mainView.getSessionId(),
                albumId: _mainView.getImageListView().getCurrentAlbumId(),
                imageURI: mediaFiles[i],
                longitude: _mainView.getLongitude(),
                latitude: _mainView.getLatitude(),
                caller: _mainView
            });

        }
    },

    onImageFailure: function(message) {
        console.error('Unable to get photo: ' + message);
    },

    showAlbumListView: function() {
        var comp = _mainView.getAlbumListView();
        if (comp != null && _mainView !== null) {

            var toolbar = _mainView.dockedItems.first();
            toolbar.removeAll();
            toolbar.add({
                ui: 'back',
                text: "Login",
                handler: function() {
                    _mainView.showCredentialDialog();
                }
            },
            {
                xtype: 'segmentedbutton',
                label: 'View',
                items: [{
                    text: "Thumbnail",
                    pressed: _mainView.isThumbnailMode(),
                    handler: function() {
                        _mainView.setThumbnailMode(true);

                    }
                },
                {
                    text: "Cover Flow",
                    pressed: (!_mainView.isThumbnailMode()),
                    handler: function() {
                        _mainView.setThumbnailMode(false);

                    }
                }]
            });
            toolbar.doLayout();
            _mainView.setActiveItem(comp);
        }
    },

    showImageListView: function() {
        var comp = this.getImageListView();
        _mainView.setActiveItem(comp);
        if (_mainView !== null) {
            var toolbar = _mainView.dockedItems.first();
            toolbar.removeAll();
            toolbar.add({
                ui: 'back',
                text: "Albums",
                handler: function() {
                    _mainView.showAlbumListView();
                    if (comp != null) {
                        comp.clear();
                    }
                }
            },
            {
                ui: 'action',
                text: "Take Photo",
                handler: function() {

                    Ext.dispatch({
                        controller: 'location_controller',
                        action: 'getCurrentLocation',
                        locationCallback:  function(success, data) {

                            if (success) {
                                console.log('Geo location lat=' + data.coords.latitude + ', long=' + data.coords.longitude);
                                _mainView.setLocation(data.coords.latitude, data.coords.longitude);
                            } else {
                                console.log('Geo location failed. Message: ' + data);
                            }

                            navigator.device.capture.captureImage(_mainView.onImageCapture, _mainView.onImageFailure, {
                                limit: 1
                            });

                        }
                    });

                }
            });
            toolbar.doLayout();
        }
    },

    setLocation: function(lat, lon) {
        this.latitude = lat;
        this.longitude = lon;
    },

    getLatitude: function() {
        return this.latitude;
    },

    getLongitude: function() {
        return this.longitude;
    },

    showVideoView: function(photoTile) {
        var comp = _mainView.getVideoView();

        if (comp !== null) {
            var smVideoPlayer = document.getElementById('sm_video_player');

            //JavaScript closures
            smVideoPlayer.onload = function() {
                _mainView.setLoading(false);
            };

            _mainView.setLoading(true);
            smVideoPlayer.src = photoTile.getImageMetadata().Video640URL;
            smVideoPlayer.load();

            if (_mainView !== null) {
                var toolbar = _mainView.dockedItems.first();
                toolbar.removeAll();
                toolbar.add({
                    ui: 'back',
                    text: "Back",
                    handler: function() {
                        _mainView.showImageListView();
                    }
                });
                toolbar.doLayout();
                _mainView.setActiveItem(comp);
                _mainView.setLoading(false);
            }
        }
    },

    showImageView: function(photoTile) {
        console.log("VIDEO ATTRIBUTE: " + photoTile.getImageMetadata().Video640URL);

        if (photoTile.getImageMetadata().Video640URL != null) {
            this.showVideoView(photoTile);
        } else {
            var imageUrl = photoTile.getImageMetadata().CustomURL;

            _mainView.setLoading(true);
            var comp = _mainView.getImageView();


            if (comp !== null) {
                comp.setPhotoTile(photoTile);
                _mainView.setActiveItem(comp);
                var smImage = document.getElementById('sm_image_view');

                smImage.onload = function() {
                    _mainView.setLoading(false);
                };
                smImage.src = imageUrl;

                if (_mainView !== null) {
                    var toolbar = _mainView.dockedItems.first();
                    toolbar.removeAll();
                    toolbar.add({
                        ui: 'back',
                        text: "Back",
                        handler: function() {
                            _mainView.showImageListView();
                        }
                    });
                    toolbar.doLayout();
                }
            }
        }
    },

    getSmugMugUsername: function() {
        return getLocalStorage().getValue("_sm_username_");
    },

    setSmugMugUsername: function(username) {
        getLocalStorage().storeValue("_sm_username_", username);
    },

    getSmugMugPassword: function() {
        return getLocalStorage().getValue("_sm_password_");
    },

    setSmugMugPassword: function(password) {
        getLocalStorage().storeValue("_sm_password_", password);
    },

    showLoginDialog: function() {
        this.showCredentialDialog();
    },

    hideLoginDialog: function() {
        this.hideCredentialDialog();
    },

    showCredentialDialog: function() {
        if (this.loginPopup === null) {
            this.loginPopup = new Ext.Panel({
                floating: true,
                modal: true,
                centered: true,
                scroll: 'vertical',
                items: [{
                    xtype: 'emailfield',
                    name: 'email',
                    label: 'Email',
                    id: 'email',
                    placeHolder: 'Please enter your email...',
                    useClearIcon: true
                },
                {
                    xtype: 'passwordfield',
                    name: 'password',
                    id: 'password',
                    label: 'Password',
                    useClearIcon: true
                },
                {
                    xtype: 'button',
                    flex: 1,
                    style: 'margin: .5em;',
                    text: 'Ok',
                    handler: function(btn) {
                        _mainView.setSmugMugUsername(Ext.getCmp('email').getValue());
                        _mainView.setSmugMugPassword(Ext.getCmp('password').getValue());
                        _mainView.setLoading(true);
                        _mainView.login();
                    }
                }],
                listeners: {
                    afterrender: function(c) {
                        _mainView.setLoading(false);
                    }
                }
            });
        }
        this.loginPopup.show('pop');
    },

    hideCredentialDialog: function() {
        if (this.loginPopup && this.loginPopup !== null) {
            this.loginPopup.destroy();
            this.loginPopup = null;
        }
    },

    login: function() {
        Ext.dispatch({
            controller: _SMUGMUG_CONTROLLER,
            action: 'login',
            caller: _mainView,
            username: this.getSmugMugUsername(),
            password: this.getSmugMugPassword()
        });
    },

    getCustomImageSize: function() {
        return this.customImageSize;
    },

    setCustomImageSize: function(size) {
        this.customImageSize = size;
    },

    getSessionId: function() {
        return this.sessionId;
    },

    getToolbarHeight: function() {
        return this.dockedItems.first().getHeight();
    },

    setSessionId: function(sessionId) {
        this.sessionId = sessionId;
        _mainView.setLoading(true);
        _mainView.hideLoginDialog();
        Ext.dispatch({
            controller: _SMUGMUG_CONTROLLER,
            action: 'getAlbumList',
            sessionId: this.sessionId,
            caller: _mainView
        });
    },

    setMainViewportSize: function(width, height) {
        this.mvWidth = width;
        this.mvHeight = height;
    },

    getMainViewportWidth: function() {
        return this.mvWidth;
    },

    getMainViewportHeight: function() {
        return this.mvHeight;
    },

    loginFailure: function(msg) {
        console.error(msg);
        this.showCredentialDialog();
    },

    setAlbumList: function(albumList) {
        var albumListPanel = _mainView.getAlbumListView();
        albumListPanel.loadAlbumList(albumList);
        this.setLoading(false);
        this.showAlbumListView();
    },

    setImageList: function(data) {
        this.getImageListView().setImageList(data);
    },

    setThumbnailMode: function(enableFlag) {

        if (this.isThumbnailView != enableFlag) {
            this.isThumbnailView = enableFlag;

            _mainView.remove(this.currentImageListPanel);

            if (this.isThumbnailView) {
                this.currentImageListPanel = new PMCLab.views.SMImageThumbnailView();
            } else {
                this.currentImageListPanel = new PMCLab.views.SMImageCoverFlowPanel();
            }
            _mainView.add(this.currentImageListPanel);
            _mainView.doLayout();
        } else {
            console.error("Set thumbnail mode is not working.");
        }
    },

    isThumbnailMode: function() {
        return this.isThumbnailView;
    },

    handleError: function(msg) {
        console.error(msg);
        _mainView.setLoading(false);
    },

    photoUploadSuccessful: function(result) {

        var uploadResponseJson = Ext.util.JSON.decode(result.response);
        console.log(result);
        console.log('Upload success: ' + uploadResponseJson.stat);
        console.log(result.bytesSent + ' bytes sent');

        var resHtml;
        if (uploadResponseJson.stat === 'ok') {
            resHtml = '<table>';
            resHtml += '<tr><th colspan=2>Photo uploaded successfully</th></tr>';
            resHtml += '<tr><td>Bytes Uploaded</td><td>' + result.bytesSent + '</td></tr>';
            resHtml += '<tr><td>URL</td><td>' + uploadResponseJson.Image.URL + '</td></tr>';
            resHtml = '</table>';
        } else {
            resHtml = '<b>Photo upload failed!</b>';

        }

        var resDialog = new Ext.Panel({
            floating: true,
            modal: true,
            centered: true,
            styleHtmlContent: true,
            //scroll: 'vertical',
            html: resHtml,
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                title: 'Photo Upload Results'
            }]
        });
        resDialog.show('pop');
    },

    initComponent: function() {
        this.isThumbnailView = true;
        this.loginPopup = null;
        this.currentImageListPanel = new PMCLab.views.SMImageThumbnailView();
        _mainView = this;
        Ext.apply(this, {
            items: [
            new PMCLab.views.SMAlbumListPanel(),
            new PMCLab.views.SMImageViewPanel(),
            new PMCLab.views.SMVideoViewPanel(),
            this.currentImageListPanel
            ],
            dockedItems: [{
                id: 'smToolbar',
                xtype: 'toolbar',
                dock: 'top',
                title: 'SmugMug',
                layout: {
                    pack: 'left'
                },
                items: [{
                    ui: 'action',
                    text: "Refresh",
                    handler: function() {}
                }]
            }]
        });
        PMCLab.views.SmugMugAlbum.superclass.initComponent.apply(this, arguments);
    },

    listeners: {
        el: {
            tap: function() {
                },

            doubletap: function() {
                _mainView.setLoading(false);
            }
        },
        activate: function() {
            if (_mainView.getSmugMugUsername() === null || _mainView.getSmugMugPassword() === null) {
                _mainView.showLoginDialog();
            } else {
                _mainView.login();
            }

            // Save viewport size
            var mainViewportWidth = _mainView.getWidth();
            var mainViewportHeight = _mainView.getHeight();


            // Adjust viewport to compensate for the presence of the toolbar
            //_toolbarHeight = 47; // TODO FIGURE OUT WHY THIS IS RETURNING 'undefined' Ext.getCmp('smImageViewToolbar').getHeight();
            mainViewportHeight -= this.getToolbarHeight();

            // SmugMug will use the longest dimension to determine the size of the proportionally scaled photo.  Since
            // the width will always be longer than the height, we will set both dimensions to be the height by height to ensure we don't
            // receive a large photo than necessary
            this.setCustomImageSize(mainViewportWidth + "x" + mainViewportHeight);

            this.setMainViewportSize(mainViewportWidth, mainViewportHeight);
        }
    }
});
