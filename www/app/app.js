// General Constants

var JSON_CALLBACK_NAME = 'Ext.util.JSONP.callback';

var mLocalStorage = new LocalStorageUtil();

function getLocalStorage() {
    return mLocalStorage;
}

function watchAcceleration() {
    if (window.device && navigator.accelerometer) {

        var options = { frequency: 3000 };  // Update every 3 seconds

        var watchID = navigator.accelerometer.watchAcceleration(
            function(acceleration) {
                console.log('Acceleration X: ' + acceleration.x + '\n' +
                             'Acceleration Y: ' + acceleration.y + '\n' +
                             'Acceleration Z: ' + acceleration.z + '\n' +
                             'Timestamp: '      + acceleration.timestamp + '\n');
            },
            function() {
                console.error('Accelerometer error');
            },
            options);
    
        console.log("Accelerometer watch ID: " + watchID);
    } else {
        console.log("-> Accelerometer function disabled.");
    }
}

function watchCompass() {

    if (window.device && navigator.compass) {

        var options = { frequency: 7000 };  // Update every 7 seconds

        var watchID = navigator.compass.watchHeading(
            function(heading) {
                console.log('Compass heading: ' + heading);
            },
            function() {
                console.error('Compass error');
            },
            options);
    } else {
        console.log("-> Compass function disabled.");
    }
}
    
var PMCLab = new Ext.Application({
    glossOnIcon: false,
    name: 'PMCLab',
    
    launch: function() {
        this.launched = true;
        if (Ext.is.Desktop || (window.device && this.launched)) {
            this.views.viewport = new this.views.Viewport();
            //watchAcceleration();
            //watchCompass();
        } else {
            return;
        }
    }
});
/*
Ext.regApplication({
    glossOnIcon: false,
    name: 'PMCLab',
    launch: function() {
        this.viewport =  new PMCLab.views.Viewport();
    }
});

Ext.setup({
    icon: 'resources/images/icon.png',
            tabletStartupScreen: 'tablet_startup.png',
            phoneStartupScreen: 'resources/images/splashscreen.png',
            statusBarStyle: 'black',
            glossOnIcon: true,
            onReady: function() {
                console.log("Ext.setup.onReady");
                BVApp.Main.launched =true;
                BVApp.Main.init();
            }
});

*/
