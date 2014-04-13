var tpl = new Ext.XTemplate(
    '<h1>Hello World</h1>'
);

PMCLab.views.ChildrensBookView = Ext.extend(Ext.Panel, {
    title: 'Goofy Goes to the Doctor',
    iconCls: "bookmarks",
    tpl: tpl,
    html: page_1
});
Ext.reg('kindle_children', PMCLab.views.ChildrensBookView);
