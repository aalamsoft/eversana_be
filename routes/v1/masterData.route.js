const express = require('express');
const { insertMasterData, deleteMasterById, edit, fetchAll, getMasterById } = require('../../controllers/masterData.Controller');
const { lookupTypeCreateValidator } = require('../../validations/user');
const router = express.Router();

router.post(
    '/add',
    insertMasterData
);

router.put(
    '/update',
    edit
);
router.get(
    '/get/:id',
    getMasterById
);
router.get(
    '/getAll',
    fetchAll
);
router.delete(
    '/delete/:id',
    deleteMasterById
);


module.exports = router;