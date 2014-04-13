PMCLab.views.Settingscard = Ext.extend(Ext.form.FormPanel, {
    title: "settings",
    iconCls: "settings",
    scroll: "vertical",
    constructor: function (a) {
        PMCLab.views.Settingscard.superclass.constructor.call(this, a)
    },
    initComponent: function() {
        Ext.apply(this, {
            dockedItems: [{
                xtype: "toolbar",
                title: "Settings"
            }],
            items: [
                {
                xtype: 'fieldset',
                title: 'Details',
                items: [{
                    xtype: 'textfield',
                    name : 'name',
                    label: 'Username'
                },{
                    xtype: 'passwordfield',
                    name : 'password',
                    label: 'Password'
                }]
            },{
                xtype:  'button',
                text:   'save',
                ui:     'confirm'
            }]
        });
        PMCLab.views.Settingscard.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('settingscard', PMCLab.views.Settingscard);
