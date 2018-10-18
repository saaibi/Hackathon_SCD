const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema
const ClientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    client_id: { type: String, required: true },
    credit: { type: Schema.Types.ObjectId, ref: 'Credit' }
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('Client', ClientSchema);
