var PMC_HOME_DIRECTORY = "pmcDirectory";
var PMC_HOME_IMAGE = "home_image.jpg";

var mFileSystem;
var mPmcHomeDirectory;
var mPmcImageFile;

function findOrCreateDirectory(dir, newDir) {

    dir.getDirectory(newDir, 
        {
            create: true,
            exclusive: false
        },
        function(parent) {
            console.log("Directory created/found: " + parent.name);
            mPmcHomeDirectory = parent;
        },
        function(error) {
            console.error("Unable to create new directory: " + error.code);
        }
    );
}

function showFileInfo(fileEntry) {
	if (fileEntry && fileEntry.file) {
		console.log("File name=" + fileEntry.file.name 
			+ "\ntype=" + fileEntry.file.type 
			+ "\nsize=" + fileEntry.file.size 
			+ "\nmodified=" + fileEntry.file.lastModifiedDate 
			+ "\nURI=" + fileEntry.toURI());
	} else {
		console.error("File entry is null.");
	}
}

function findOrCreateFile(dir, newFileName) {
    dir.getFile(newFileName, 
        {
            create: true,
            exclusive: false
        },
        function(parent) {
            console.log("File created/found: " + parent.name);
            mPmcImageFile = parent;
            showFileInfo(mPmcImageFile);
            console.log("Image File URI: " + mPmcImageFile.toURI());
        },
        function(error) {
            console.error("Unable to create new file: " + error.code);
        }
    );
}

function getFileMetadata(file) {
	if (file) {
		// Request the metadata object for this entry
		file.getMetadata(
		    function(metadata) {
                console.log("Last Modified: " + metadata.modificationTime);
            },
            function(error) {
                console.error(error.code);
            }
        );
	} else {
		console.error("File is null.");
	}
}
function writeToFile(fileSystem, parentDirectory, newFileName, data) {

    console.log("XXXX " + (data !== null) + " / " + fileSystem + " / " + parentDirectory + " / " + newFileName);

    console.log("YYYY " + fileSystem.root);
    // Get the data directory, creating it if it doesn't exist.
    //var directory = fileSystem.root.getDirectory(parentDirectory, {create: true, exclusive: false});
    console.log("ZZZZ " + mPmcHomeDirectory);

    // Create the  file, if and only if it doesn't exist.
    //var file = mPmcHomeDirectory.getFile(newFileName, {create: true, exclusive: false});
    console.log("SSSS " + mPmcImageFile);

    var writeSuccess = function(writer) {
        writer.onwrite = function(evt) {
            console.log('Successfully wrote to file ' + newFileName + '.');
			showFileInfo(mPmcImageFile);

        };
        writer.write(data);
    };

    var writeFailure = function(evt) {
        console.error(error.code);
    };

    mPmcImageFile.createWriter(writeSuccess, writeFailure);
}

function getDirectoryEntries(dir) {
    console.log("11");

    if (dir) {
        var onReaderSuccess = function(entries) {
            var i;
            for (i = 0; i < entries.length; i++) {
                console.log("--> " + entries[i].fullPath + " | " + entries[i].name);
            }
        };
        console.log("22");

        var onReaderFailure = function(error) {
            console.error("Failed to list directory contents: " + error.code);
        };
        console.log("33");
        // Get files in the directory
        var directoryReader = dir.createReader();

        console.log("44");
        // Get a list of all the entries in the directory
        directoryReader.readEntries(onReaderSuccess, onReaderFailure);
        console.log("55");
    } else {
        console.error("Parent directory is null");
    }
}


function getFileSystemRoot(persistent) {
    if (!Ext.is.Desktop) {
        var onFileSystemSuccess = function(fileSystem) {
            if (fileSystem) {
                mFileSystem = fileSystem;
                console.log("File system name: " + fileSystem.name + ", root: " + fileSystem.root.name);
                var rootDirectory = fileSystem.root;

                getDirectoryEntries(rootDirectory);

                if (rootDirectory) {
                    findOrCreateDirectory(rootDirectory, PMC_HOME_DIRECTORY);
                } else {
                    console.error("Unable to find the root directory");
                }
                // Get files in the directory
                //var directoryReader = rootDirectory.createReader();
                //createDirectory(rootDirectory, "pmcDirectory");
                // Get a list of all the entries in the directory
                //directoryReader.readEntries(onReaderSuccess, onReaderFailure);
            } else {
                console.log("File system is null.");
            }
        };

        var onFileSystemFailure = function(evt) {
            console.error("Unable to get file system. Reason: " + evt.target.error.code);
        };

        console.log("Requesting " + (persistent ? "persistent": " temporary") + " file system.");
        window.requestFileSystem((persistent ? LocalFileSystem.PERSISTENT : LocalFileSystem.TEMPORARY), 0, onFileSystemSuccess, onFileSystemFailure);
    }
}
