Ext.data.RottenTomatoesProxy = Ext.extend(Ext.data.ScriptTagProxy, {
    url: RT_MOVIE_LIST_ARRAY[RT_DEFAULT_INDEX],
    pageParam: 'page',
    limitParam: 'page_limit',
    perPage: 40,
    apiKey: RT_API_KEY,
    extraParams: {
        apiKey: RT_API_KEY
    },
    constructor: function(config) {
        config = config || {};
        
        Ext.applyIf(config, {
            extraParams: {
                 apiKey: RT_API_KEY,
                 page_limit: 40,
                 page: 1
            },
            reader: {
                type: 'json',
                root: 'movies'
            }
        });
        
        Ext.data.RottenTomatoesProxy.superclass.constructor.call(this, config);
    }
});

Ext.data.ProxyMgr.registerType('rotten_tomatoes_proxy', Ext.data.RottenTomatoesProxy);
