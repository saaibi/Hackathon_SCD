const Credit = require("../models/credit");

const creditController = {};

creditController.getAllCredit = async (req, res) => {
    const credits = await Credit.find();
    res.json(credits);
};

creditController.getByIdCredit = async (req, res) => {
    const credit = await Credit.findById(req.params.id);
    res.json(credit);
};

// query = { _id: req.params.id };
// console.log(moment(credit.startDate).format("DD/MM/YYYY HH:mm"))
creditController.updateCredit = async (req, res) => {
    const { addCredit, valueCredit, endDate, startDate } = req.body;
    const creditUpdate = {
        addCredit: addCredit,
        valueCredit: valueCredit,
        startDate: Date(startDate),
        endDate: Date(endDate)
    };
    const options = { new: true, runValidators: true };

    await Credit.findByIdAndUpdate(req.params.id, creditUpdate, options, (err, credit) => {
        if (err) return res.json({ error: err });
        res.json({ status: "Credit Updated", credit });
    });
};

creditController.updateCreditBalance = async (req, res) => {
    const { valuePaid ,valueCredit } = req.body;

    await Credit.findByIdAndUpdate(req.params.id, { valuePaid , valueCredit }, { new: true }, (err, credit) => {
        if (err) return res.json({ error: err });
        res.json({ status: "Credit Updated", credit });
    });

};


module.exports = creditController;