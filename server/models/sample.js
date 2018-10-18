const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema
const SampleSchema = new Schema({
    img: { data: Buffer, contentType: String }
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('Sample', SampleSchema);

//  Credit.schema.pre
//  http://132.145.156.124:5000/recognition
// const sample = new Sample();
// sample.img.data = fs.readFileSync(req.file.path)
// sample.img.contentType = 'image/jpg';
// sample.save();