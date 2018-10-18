const express = require('express');
const router = express.Router();


const creditController = require('../controllers/credit.controller');

router.get('/', creditController.getAllCredit);
router.get('/:id', creditController.getByIdCredit);
router.put('/:id', creditController.updateCredit);
router.put('/:id/credit', creditController.updateCreditBalance);

module.exports = router;