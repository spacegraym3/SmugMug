Ext.regModel('SmugMugAlbum', {
    fields: [{
		name: 'id',
		name: 'Title',
		name: 'Key',
		name: 'Category'
    }]
});

Ext.regModel('SmugMugImage', {

    fields: [{
        name: 'id',
		name: 'Key',
		name: 'Category',
		name: 'Keywords',
		name: 'FileName',
		name: 'Format',
		
		name: 'Date',
		name: 'LastUpdated',
		
		name: 'MD5Sum',
		name: 'Position',
		name: 'Serial',
		name: 'Type',
		
		name: 'Size',
		name: 'Height',
		name: 'Width',
		
		name: 'CustomURL',
		name: 'URL',
		name: 'TinyURL',
		name: 'ThumbURL',
		name: 'SmallURL',
		name: 'MediumURL',
		name: 'LargeURL',
		name: 'LightboxURL',
		name: 'OriginalURL',
		name: 'X2LargeURL',
		name: 'X3LargeURL',
		
		name: 'Watermark',
		name: 'MD5Sum'
    }]
});