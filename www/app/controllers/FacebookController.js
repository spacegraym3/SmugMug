var FACEBOOK_APP_ID = 217724188261763;
var FACEBOOK_API_KEY = '66849a3627e13b2c78baa93437c39fe4';
var FACEBOOK_APP_SECRET = '9859fda47214eedac3791464d1b84407';

function verifyFBStatus(loginTheUser, redirectToController, redirectToAction, additionalParams) {
    console.log("social:verifyFBStatus");
    //check to see if we have authorized through facebook
    FB.getLoginStatus(function(response) {
        if (response.session) {
            //They are already logged in
            console.log("User is authorized for facebook. ");
            this.applicationName.fbAccessToken = response.session.access_token;
            this.applicationName.fbSession = response.session.session_key;
            this.applicationName.fbUserId = response.session.uid;
            Ext.dispatch({controller: redirectToController, action: redirectToAction, params: additionalParams});
        } else if(loginTheUser) {
            // no user session available yet
            console.log("user has not authorized for facebook yet, need to login");
            // see http://developers.facebook.com/docs/guides/mobile/#web for info
            // and http://developers.facebook.com/docs/reference/dialogs/oauth/
            var redirectTo = encodeURI(document.location.href.split('?')[0].split('#')[0]);
            if(redirectToController && redirectToController.length > 0) {
                redirectTo = redirectTo + "&state=" + redirectToController + "," + redirectToAction;
                if(additionalParams) {
                    redirectTo = redirectTo + "," + additionalParams
                }
            }
            var appId = FACEBOOK_APP_ID; //prod app id
            //put the part of the URL that differentiates your dev URI from the prod one, so you can test and have something in prod at the same time.
            if(document.location.href.indexOf("dev") > -1) 
            appId = 'FACEBOOK_APP_ID' //dev app id
            document.location.href = 'http://www.facebook.com/dialog/oauth?client_id=' + appId + '&redirect_uri=' + redirectTo + '&display=touch&scope=publish_stream&response_type=token';
        }
    });
};