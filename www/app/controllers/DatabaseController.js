
var DB_DEFAULT_VERSION = '1.0';
var DB_DEFAULT_NAME_POSTFIX = '_Db';
var DB_DEFAULT_SIZE = 1000000;

function _getDatabase(name, version, displayName, size) {
	return window.openDatabase(name, version, displayName, size);
}

function executeSql(database, sqlArray, callback) {
    function runSql(tx) {
        var i;
        for (i = 0; i < sqlArray.length; i++) {
            tx.executeSql(sqlArray[i]);
        }
	}

	function errorCB(err) {
	    callback.fail(err);
	    console.error("Error processing SQL: "+err.code);
	}

	function successCB() {
	    callback.success();
	}

	database.transaction(runSql, errorCB, successCB);
}

PMCLab.controllers.database = new Ext.Controller({

    getDatabase: function(options) {
	
		console.log(options);

		if (options) {
		    var name = options.name;
		    var version = (options.dbVersion ? options.dbVersion : DB_DEFAULT_VERSION);
		    var displayName = (options.dbInstanceName ? options.dbInstanceName : name + DB_DEFAULT_NAME_POSTFIX);
		    var size = (options.dbSize ? options.dbSize : DB_DEFAULT_SIZE);
		    var callback = options.dbOpenCallback;
		    
		    callback.databaseOpened(_getDatabase(name, version, displayName, size));
		} else {
		    console.log('Options not specified');
		}
	},
	createTable: function(options) {
	    if (options && options.database) {
	        
		    var callback = options.dbCreateTablenCallback;
		    var database = options.database;
		    var tableName = options.dbTableName;
		    var columnArray = options.dbColumns;
		    
		    var sql = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (';
		    var i;
		    for (i = 0; i < columnArray.length; i++) {
		        if (i > 0) {
		            sql += ',';
	            }
		        sql += columnArray[i];
            }
            sql += ')';
            console.log("SQL: " + sql);
            
            var sqlArray = new Array(sql);
            
            executeSql(database, sqlArray, callback);
	    } else {
	        console.log('Options or database not specified');
	    }
	},
	insertData: function(options) {
	    if (options && options.database) {
		    var callback = options.dbCreateTablenCallback;
		    var database = options.database;
		    var tableName = options.dbTableName;
		    var columnArray = options.dbColumns;
		    var columnValueArray = options.dbColumnValues;
		    
		    var sql = 'INSERT INTO ' + tableName + ' (';
		    var i;
		    for (i = 0; i < columnArray.length; i++) {
		        if (i > 0) {
		            sql += ',';
	            }
		        sql += columnArray[i];
            }
            sql += ') VALUES (';
            var g;
		    for (g = 0; g < columnValueArray.length; g++) {
		        if (g > 0) {
		            sql += ',';
	            }
		        sql += '"';
		        sql += columnValueArray[g];
		        sql += '"';
            }
            sql += ')';
            console.log("SQL: " + sql);

            var sqlArray = new Array(sql);

            executeSql(database, sqlArray, callback);
	    } else {
	        console.log('Options or database not specified');
	    }
	}
});
