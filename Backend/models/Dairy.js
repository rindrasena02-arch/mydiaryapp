const mongoose = require("mongoose");

const dairySchema = mongoose.Schema(
    {
        title: {
            type:String,
            required: true
        },
        description: {
            type:String,
            required: true
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        time: {
            type: Date,
            default: Date.now
        }

    }
);

module.exports = mongoose.model("Dairy",dairySchema);