const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const masterDataService = require('../services/masterData.service')
const { handleError, ErrorHandler } = require('./../config/error');
const errorText = 'Error';

const insertMasterData = catchAsync(async (req, res) => {
    const methodName = '/add'
    try {
        const data = await masterDataService.insertMasterData(req.body);
        res.send(data);
    } catch (err) {
        handleError(new ErrorHandler(errorText, methodName, err), res);
    }
});

const edit = catchAsync(async (req, res) => {
    const methodName = '/edit'
    try {
        const data = await masterDataService.edit(req.body);
        res.send(data);
    } catch (err) {
        handleError(new ErrorHandler(errorText, methodName, err), res);
    }
});

const getMasterById = catchAsync(async (req, res) => {
    const methodName = '/getMasterById'
    try {
        const lookupType = await masterDataService.getMasterById(req.params.id);
        res.send(lookupType);
    } catch (err) {
        handleError(new ErrorHandler(errorText, methodName, err), res);
    }
});

const deleteMasterById = catchAsync(async (req, res) => {
    const methodName = '/deleteMasterById'
    try {
        const lookupType = await masterDataService.deleteMasterById(req.params.id);
        res.status(httpStatus.NO_CONTENT).send(lookupType);
    } catch (err) {
        handleError(new ErrorHandler(errorText, methodName, err), res);
    }
});
const fetchAll = catchAsync(async (req, res) => {
    const methodName = '/fetchAll'
    try {
        const lookupTypes = await masterDataService.fetchAll();
        res.send(lookupTypes);
    } catch (err) {
        handleError(new ErrorHandler(errorText, methodName, err), res);
    }
});

module.exports = {
    insertMasterData,
    getMasterById,
    deleteMasterById,
    fetchAll,
    edit
};