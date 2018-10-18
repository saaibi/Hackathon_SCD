const express = require('express');
const router = express.Router();


const clientController = require('../controllers/clients.controller');

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getByIdClient);
router.get('/:id/credit', clientController.getByIdClientCredit);
router.post('/', clientController.createClient);
router.put('/:id/client', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;