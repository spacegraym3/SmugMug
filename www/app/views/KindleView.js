PMCLab.views.KindleForWeb = Ext.extend(Ext.Panel, {
    constructor: function (a) {
        PMCLab.views.KindleForWeb.superclass.constructor.call(this, a)
    },
    title: 'Kindle for Web',
    iconCls: "bookmarks",
    listeners: {
        activate: function() {
            this.update('<iframe src="http://read.amazon.com/" width="100%" height="100%"></iframe>');
        }
    }
});

Ext.reg('kindle', PMCLab.views.KindleForWeb);
