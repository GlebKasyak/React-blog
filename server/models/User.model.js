const { Schema, model } = require("mongoose");
// const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    secondName: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
},{
    timestamps: true
});

// //triggered after event "save" in user.router(post)
// UserSchema.pre("save", function(next) {
//     if(this.isModified("password")) {
//         bcrypt.genSalt(10, (err, salt) => {
//             if(err) return next(err);
//
//             bcrypt.hash(this.password, salt, (err, hash) => {
//                 if(err) return next(err);
//
//                 this.password = hash;
//                 next();
//             })
//         })
//     } else next();
// });

//compare
//comparePassword from user.router
// UserSchema.methods.comparePassword = function(plainPassword, cb) {
//     bcrypt.compare(plainPassword, this.password).then( res => {
//         cb(null, res)
//     });
// };

module.exports = model("User", UserSchema);