const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    sex: {type: String, enum: ["male", "female"]},
}, {
    timestamps: true
})

module.exports = model("User", schema)