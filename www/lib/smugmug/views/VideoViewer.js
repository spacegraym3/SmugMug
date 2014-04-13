/**
 * Created by JetBrains WebStorm.
 * User: chriswhite
 * Date: 9/29/11
 * Time: 10:30 AM
 * To change this template use File | Settings | File Templates.
 */

var videoPanelHTML = '<center>';
videoPanelHTML += '<video id="sm_video_player" width="100%" height="100%" controls>';
videoPanelHTML += 'Video is not supported';
videoPanelHTML += '</video>';
videoPanelHTML += '</center>';



PMCLab.views.SMVideoViewPanel = Ext.extend(Ext.Panel, {
    centered: true,
    width: '100%',
    height: '100%',
    scroll: 'both',
    id: 'smVideoView',
    draggable: false,
    html: videoPanelHTML,
    listeners: {
        afterrender: function(c) {
            if (_mainView !== null) {
                _mainView.setLoading(false);
            }
        }
    },
    initComponent: function() {
        PMCLab.views.SMVideoViewPanel.superclass.initComponent.apply(this, arguments);
    }
});
