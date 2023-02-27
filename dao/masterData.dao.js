const snowflakedb = require('../utils/snowflakedb')

const add = async (body) => {
    try {
        let { type, name, parent_master_id = null, description, is_delete = 'N', status = 'A' } = body
        let query = `INSERT INTO MASTER_DATAS
        (TYPE, NAME, PARENT_MASTER_ID, DESCRIPTION, IS_DELETE, STATUS, CREATED_BY, CREATED_DATE, MODIFIED_BY, MODIFIED_DATE)
        VALUES(?,?,?,?,?, ?, 10, CURRENT_TIMESTAMP(), null, null)`

        let result = new Promise((resolve, reject) =>
            snowflakedb.execute({
                sqlText: query,
                binds: [type, name, parent_master_id, description, is_delete, status],
                complete: (err, stmt, rows) => err ? reject(err) : resolve(rows)
            }))
        console.log("check response data-->", result)
        return result;
    }
    catch (error) {
        console.log("Error occurred in master data dao add", error)
        throw error;
    }
}

const edit = async (body) => {
    try {
        let { type, name, parent_master_id = null, description, status = 'A', id } = body
        console.log("check request data -->", body)
        let query = `UPDATE MASTER_DATAS
        SET TYPE=?, NAME=?, PARENT_MASTER_ID=?, DESCRIPTION=?, STATUS=?, MODIFIED_BY=10, MODIFIED_DATE=CURRENT_TIMESTAMP()
        WHERE ID=?`
        let result = new Promise((resolve, reject) =>
            snowflakedb.execute({
                sqlText: query,
                binds: [type, name, parent_master_id, description, status, id],
                complete: (err, stmt, rows) => err ? reject(err) : resolve(rows)
            }))
        return result;
    }
    catch (error) {
        console.log("Error occurred in master data dao edit", error)
        throw error;
    }
}

const getById = async (id) => {
    try {
        console.log("Get Method call-->", id)
        let result = new Promise((resolve, reject) =>
            snowflakedb.execute({
                sqlText: `SELECT * FROM master_datas where id = ? and IS_DELETE != 'Y'`,
                binds: [id],
                complete: (err, stmt, rows) => err ? reject(err) : resolve(rows)
            }))
        return result;
    }
    catch (error) {
        console.log("Error occurred in master data dao getById", error)
        throw error;
    }
}

const getAll = () => {
    try {
        console.log("Get All Method Call")
        let result = new Promise((resolve, reject) =>
            snowflakedb.execute({
                sqlText: `SELECT * FROM master_datas where IS_DELETE != 'Y' ORDER BY CREATED_DATE DESC `,
                complete: (err, stmt, rows) => err ? reject(err) : resolve(rows)
            }))
        return result;
    }
    catch (error) {
        console.log("Error occurred in master data dao getAll", error)
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        console.log("Delete Method Call---->", id)
        let result = new Promise((resolve, reject) =>
            snowflakedb.execute({
                sqlText: `UPDATE MASTER_DATAS
                SET IS_DELETE='Y', MODIFIED_BY=10, MODIFIED_DATE=CURRENT_TIMESTAMP()
                WHERE ID=?`,
                binds: [id],
                complete: (err, stmt, rows) => err ? reject(err) : resolve(rows)
            }))
        return result;
    }
    catch (error) {
        console.log("Error occurred in master data dao deleteById", error)
        throw error;
    }
}


module.exports = {
    add,
    getById,
    deleteById,
    getAll,
    edit
}