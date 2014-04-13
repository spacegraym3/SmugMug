/**
 *  
 * @return Object literal singleton instance of DirectoryListing
 */
var DirectoryListing = { 
	/**
	 * @param directory The directory for which we want the listing
	 * @param successCallback The callback which will be called when directory listing is successful
	 * @param failureCallback The callback which will be called when directory listing encouters an error
	 */
	list: function(directory,successCallback, failureCallback) {
	 return PhoneGap.exec(successCallback,    //Success callback from the plugin
                          failureCallback,     //Error callback from the plugin
                          'DirectoryListPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin
                          'list',              //Tell plugin, which action we want to perform
                          [directory]);        //Passing list of args to the plugin
	}
};
 