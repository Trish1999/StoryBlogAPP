const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: {
            createdAt: "createdAt", updatedAt: "updatedAt"
        }
    }
);
module.exports=mongoose.model("User",userSchema)