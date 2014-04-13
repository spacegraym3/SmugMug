this.onmessage = function (event) {
    var data = event.data;
    switch (data.cmd) {
        case 'start':
            self.postMessage('WORKER STARTED: ' + data.msg);
            break;
        case 'stop':
            self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
            self.close(); // Terminates the worker.
            break;
        case 'login':
    		self.postMessage(data);
		
    		if (data.username && data.password) {
    			
    		    Ext.util.JSONP.request({
    			    url: SMUGMUG_API_URL,
    		        callbackKey: JSON_CALLBACK_NAME,
    		        params: {
    		            APIKey: SMUGMUG_API_KEY,
    		            method: SMUGMUG_LOGIN_METHOD,
    		            EmailAddress: options.username,
    					Password: options.password,
    		            Callback: JSON_CALLBACK_NAME
    		        },
    		        callback: function(response) {
        		    
    					if (response.stat && response.stat === 'ok') {
            				self.postMessage(response.Login.Session.id);
    					} else {
    						self.postMessage("Error: Failed to login.");
    					}
    		        }
    		    });
    		} else {
    			self.postMessage("Error: Username, password or caller not defined.");
    		}
            break;
        case 'getAlbumList':
            self.postMessage(data);

        	if (data.sessionId) {

        		self.postMessage("Sending JSONP request.");
        		Ext.util.JSONP.request({
        		    url: SMUGMUG_API_URL,
        	        callbackKey: JSON_CALLBACK_NAME,
        	        params: {
        	            APIKey: SMUGMUG_API_KEY,
        	            method: SMUGMUG_ALBUMS_METHOD,
        	            SessionID: data.sessionId,
        	            Heavy: true,
        	            Callback: JSON_CALLBACK_NAME
        	        },
        	        callback: function(response) {
            			self.postMessage(response);
        				if (response.stat && response.stat === 'ok') {
        					var albumList = response.Albums;
        					self.postMessage(albumList);
        					//options.caller.setAlbumList(albumList);
        				} else {
        					//options.caller.handleError("Failed to get album list.");
        				}
        	        }
        	    });

        	} else {
        		self.postMessage("Error: Session ID or caller not defined.");
        	}
            break;
        default:
            self.postMessage('Unknown command: ' + data.msg);
    };
};

this.onerror = function (e) {
	self.postMessage("Error: " + e);
};