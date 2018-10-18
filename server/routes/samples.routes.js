const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const name = req.body.name ? req.body.name.toLowerCase() + '_' : '';
        cb(null, name + Date.now() + '_' + file.originalname);
    }
})

const upload = multer({ storage });
// const upload = multer({ dest: './upload/'});


const sampleController = require('../controllers/sample.controller');

router.get('/', sampleController.getAllSamples);
router.get('/:customer_documentId', sampleController.getOneAccount);
// router.get('/:id', clientController.getByIdClient);
// router.get('/:id/credit', clientController.getByIdClientCredit);
router.post('/', upload.single('file'), sampleController.createFaceRecognition);
router.post('/recognition', upload.single('recognitionImages'), sampleController.createRecognition);
// router.put('/:id/client', clientController.updateClient);
// router.delete('/:id', clientController.deleteClient);

module.exports = router;