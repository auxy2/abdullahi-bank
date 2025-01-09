import mongoose  from "mongoose";


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }, 
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    } ,
    walletBalance: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("User", UserSchema);