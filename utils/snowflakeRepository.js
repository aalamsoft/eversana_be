const snowflake = require('snowflake-sdk')

module.export = class SnowflakeRepository {

	constructor() {
		this.connection = snowflake.createConnection({
			account: `ixkmqmc-tz38255`,
			username: `Jegan143`,
			password: `A@lam@123`,
			database: 'Demo',
			schema: 'Public',
			warehouse: 'COMPUTE_WH'
		})
		//Connect to snowflake when the object is created
		connectToSnowflake();
	}

	connectToSnowflake = () => {
		this.connection.connect(
			(err, conn) => err ? console.log('Snowflake Error: ', err)
				: console.log('Snowflake Connection Success: ', conn.getId()))
	}

	executeQuery = (query) => {
		return new Promise((resolve, reject) =>
			this.connection.execute({
				sqlText: query,
				complete: (err, stmt, rows) => err ? reject(err) : resolve(rows)
			}))
	}

	fetchData = () => {
		return Promise.all([
			executeQuery(query1),
			executeQuery(query2)])
	}
}