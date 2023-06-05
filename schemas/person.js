const mongoose = require("mongoose"),
    personSchema = new mongoose.Schema({
        name: String,
        age: Number,
        favoriteFoods: [String]
    })

module.exports = personSchema;