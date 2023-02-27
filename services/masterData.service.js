const masterDataDao = require('../dao/masterData.dao')

/**
 *Method to create master Dats
 * @param {JSon} body 
 */
const insertMasterData = async (body) => {
    try {
        let result = null;
        result = await masterDataDao.add(body);
        return result;
    } catch (error) {
        console.log("Error occurred in insertMasterData: ", error);
        throw error;
    }
}

const edit = async (body) => {
    try {
        let result = null;
        let dbLookupType = null;
        const { id, type, name, parent_master_id = null, description } = body
        dbLookupType = await masterDataDao.getById(id);
        if (dbLookupType !== null) {
            result = await masterDataDao.edit(body)
        } else {
            result = { message: "Master Data not exist" };
        }
        return result;
    } catch (error) {
        console.log("Error occurred in edit: ", error);
        throw error;
    }
}

/**
 * Method to get master data by id
 * @param {number} id 
 * @returns 
 */
const getMasterById = async (id) => {
    try {
        let result = await masterDataDao.getById(id);
        return result;
    } catch (error) {
        console.log("Error occurred in getMasterById: ", error);
        throw error;
    }
};

/**
 * Method to get all  Master Data
 */
const fetchAll = async () => {
    try {
        return await masterDataDao.getAll();
    } catch (error) {
        console.log("Error occurred in fetchAll: ", error);
        throw error;
    }
};

/**
 * Method to delete master data
 * @param {number} id 
 */
const deleteMasterById = async (id) => {
    try {
        return await masterDataDao.deleteById(id);
    } catch (error) {
        console.log("Error occurred in deleteMasterById: ", error);
        throw error;
    }
};

module.exports = {
    insertMasterData,
    getMasterById,
    deleteMasterById,
    fetchAll,
    edit

};