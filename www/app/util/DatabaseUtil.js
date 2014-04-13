
function DatabaseUtil() {
    this.DB_DEFAULT_VERSION = '1.0';
    this.DB_DEFAULT_NAME_POSTFIX = '_Db';
    this.DB_DEFAULT_SIZE = 1000000;
}



DatabaseUtil.prototype.getDatabase = function(name, version, displayName, size) {
   return window.openDatabase(name, 
	    (version     ? version : this.DB_DEFAULT_VERSION), 
	    (displayName ? displayName : name + this.DB_DEFAULT_NAME_POSTFIX), 
	    (size        ? size : this.DB_DEFAULT_SIZE));
};

DatabaseUtil.prototype.executeSql = function(database, sqlArray) {
    database.transaction(
        function(tx) {
            var i;
            for (i = 0; i < sqlArray.length; i++) {
                tx.executeSql(sqlArray[i]);
            }
        },
        function(err) {
            console.error("Error processing SQL: "+err.code);
        },
        function() {
            console.log("SQL executed successfully.");
        });
};

DatabaseUtil.prototype.createTable = function(database, tableName, columnArray) {
		    
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
    
    this.executeSql(database, new Array(sql));
};

DatabaseUtil.prototype.insertData = function(database, tableName, columnArray, columnValueArray) {
		    
    var sql = 'INSERT INTO ' + tableName + ' (';
    var i;
    for (i = 0; i < columnArray.length; i++) {
        if (i > 0) {
            sql += ',';
        }
        sql += columnArray[i];
    }
    sql += ') VALUES (';
    for (i = 0; i < columnValueArray.length; i++) {
        if (i > 0) {
            sql += ',';
        }
        sql += '"';
        sql += columnValueArray[i];
        sql += '"';
    }
    sql += ')';
    console.log("SQL: " + sql);

    this.executeSql(database, new Array(sql));
};

DatabaseUtil.prototype.queryData = function(database, tableName) {
    var sql = 'SELECT * FROM ' + tableName;
    
    database.transaction(
        function(tx) {
            tx.executeSql(sql, [], 
                function(tx, results) {
                    var len = results.rows.length;
                    var i;
                    for (i=0; i<len; i++){
                        // TODO: Determine how to best pass in the column names
                        console.log("Row = " + i + " ID = " + results.rows.item(i).key + " Data =  " + results.rows.item(i).value);
                    }
                },
                function(err) {
                    console.error("Error processing SQL: "+err.code);
                }
            );
        },
        function(err) {
            console.error("Error processing SQL: "+err.code);
        }
    );
};
