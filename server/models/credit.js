const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

//moment('05/15/2020 12:00', 'MM/DD/YYYY HH:mm')

const creditSchema = new Schema({
    addCredit: { type: Boolean, default: false },
    valuePaid: { type: Number, default: 0 },
    payDaily: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, default: moment('05/15/2020 12:00', 'MM/DD/YYYY HH:mm') },
    valueCredit: {
        type: Number,
        default: 0,
        max: 1000000,
        min: 0,
    },
    percentagePaid: { type: Number, default: 0 },
    interest: { type: Number, default: 20 }
}, {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

creditSchema.pre('save', function (next) {
    let { valueCredit, valuePaid } = this;
    this.percentagePaid = (valuePaid / valueCredit) * 100;
    next();
});

// this._update.$set.valueCredit
// this._update
creditSchema.pre('findOneAndUpdate', function (next) {
    let { valueCredit, valuePaid } = this._update;
    let valueP = valuePaid ? valuePaid : 0;
    this._update.percentagePaid = (valueP / valueCredit) * 100;
    next();
});

module.exports = mongoose.model('Credit', creditSchema)