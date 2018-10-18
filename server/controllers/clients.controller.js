const Client = require("../models/clients");
const Credit = require("../models/credit");

const clientController = {};

clientController.getAllClients = async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
};

clientController.getByIdClient = async (req, res) => {
    const client = await Client.findById(req.params.id);
    res.json(client);
};

clientController.getByIdClientCredit = async (req, res) => {
    const client = await Client.findById(req.params.id).populate('credit').exec();
    res.json(client);
};

//  Credit.schema.pre
clientController.createClient = async (req, res) => {
    const { firstName, lastName, client_id } = req.body;
    const creditModel = new Credit({});

    await creditModel.save((err) => {
        if (err) return (res.json({ error: err }));
    });
    const client = new Client({
        firstName, lastName, client_id, credit: creditModel,
    });
    await client.save((err, client) => {
        if (err) return res.json({ error: err });
        res.json({ status: "Client Saved", client });
    });

};

clientController.updateClient = async (req, res) => {
    const { firstName, lastName } = req.body;
    const clientUpdate = { firstName, lastName };

    await Client.findByIdAndUpdate(req.params.id, clientUpdate, { new: true }, (err, client) => {
        if (err) return res.json({ error: err });
        res.json({ status: "Client Updated", client });
    });

};

// Pending Review
clientController.deleteClient = async (req, res) => {
    try {
        let credit_id = ''
        await Client.findByIdAndRemove(req.params.id, (err, client) => {
            if (err) return res.json({ error: err });
            credit_id = client.credit;
        });
        await Credit.findByIdAndRemove(credit_id, (err, credit) => {
            if (err) return res.json({ error: err });
            res.json({ status: "Client Removed" });
        })
    } catch (error) {
        const message = error.message || error;
        res.json({ error: message });
    }

};

module.exports = clientController;
