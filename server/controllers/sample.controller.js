const Sample = require("../models/sample");
const fs = require("fs");
const request = require('request');

const sampleController = {};

const URLFACE = 'http://132.145.156.124:5000';
const URLFACEREC = 'http://132.145.156.124:5000/recognition';

sampleController.getAllSamples = async (req, res) => {
    const samples = await Sample.find();
    res.json(samples);
};

sampleController.getOneAccount = async (req, res) => {
    const url = 'http://loopback-hackathon.mybluemix.net/api/accounts/findOne'
    await request.get({ url: url, qs: { "filter": { "customer_documentId": req.params.customer_documentId } } }, (err, httpResponse, body) => {
        if (err) {
            return console.error('upload failed:', err);
        }
        res.json(body);
    });
};

sampleController.createFaceRecognition = async (req, res) => {
    const formData = {
        name: req.body.name,
        file: fs.createReadStream(req.file.path)
    };
    faceRecognition(formData);
    await request.post({ url: URLFACE, formData }, (err, httpResponse, body) => {
        if (err) {
            return console.error('upload failed:', err);
        }
        res.json(body);
    });
};

sampleController.createRecognition = async (req, res) => {
    const formData = {
        file: fs.createReadStream(req.file.path)
    };
    await request.post({ url: URLFACEREC, formData }, (err, httpResponse, body) => {
        if (err) {
            return console.error('upload failed:', err);
        }
        res.json(body);
    });
};

const faceRecognition = async (formData) => {
    await request.post({ url: URLFACE, formData }, (err, httpResponse, body) => {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log(body);
    });
}

module.exports = sampleController;