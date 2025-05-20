import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name :String,
    email:String,
    mobile:Number,
    age:Number,
    password: String

});


const UsersData = mongoose.model('UsersData', userSchema);
export default UsersData;
