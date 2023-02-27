var snowflake = require('snowflake-sdk');
var connection = snowflake.createConnection({
    account: `pbzokbl-yf10558`,
    username: `tharanetharan`,
    password: `Snow#0808`,
    database: 'eversana_db',
    schema: 'Public',
    warehouse: 'eversana_wh'
});
connection.connect(function (err, conn) {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    } else {
        console.log('Successfully connected as id: ' + connection.getId());
    }

});


module.exports = connection;