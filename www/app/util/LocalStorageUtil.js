function LocalStorageUtil() {
}

LocalStorageUtil.prototype.storeValue = function(key, value) {
	if (window.localStorage) {
		try {
			window.localStorage.setItem(key, value);
		} catch (e) {
			console.error(e);
		}
	}
};

LocalStorageUtil.prototype.getValue = function(key) {
    return (window.localStorage ? window.localStorage.getItem(key) : null);
};


LocalStorageUtil.prototype.removeValue = function(key) {    
    if (window.localStorage) {
        window.localStorage.removeItem(key);
    }
};

LocalStorageUtil.prototype.clearValues = function() {
    if (window.localStorage) {
        window.localStorage.clear();
    }  
};

