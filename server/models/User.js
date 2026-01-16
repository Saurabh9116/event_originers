// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {type: String, required: true },
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true },
//     cartItems: {type: Object, default: {} },
// }, {minimize: false})

// const User = mongoose.models.user || mongoose.model('user', userSchema)

// export default User




import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems: { type: Object, default: {} },
    mobile: { type: String, required: true },
    resetPasswordToken: { type: String },       // 🔑 for forgot password
    resetPasswordExpires: { type: Date },       // 🔑 expiry
}, { minimize: false });

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;
