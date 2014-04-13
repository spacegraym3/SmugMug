var formatTwitterMessages = function(response) {
	
	var tpl = new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="thumb-wrap" id="{name}">',
            '<img src="{url}" title="{name}">',
            '<span>Name: {name} {vorname}, {alter} Jahre',
            '<input type="button" name="addButton" value="Add"/></div>',
        '</tpl>'
    );


};


