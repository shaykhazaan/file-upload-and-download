const mongoose = require('mongoose');

const schema = mongoose.Schema;

const dataSchema = new schema({
    fileName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Upload',dataSchema);