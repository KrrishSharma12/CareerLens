const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already taken"],
        required: true
    },
    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;