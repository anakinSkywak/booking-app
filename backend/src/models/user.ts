import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType extends Document {
    _id: string,
    email: string,
    password: string,
    firstname: string,
    lastName: string,
}

const userSchema: Schema<UserType> = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastName: { type: String, required: true },
});

// chức năng hash password
userSchema.pre<UserType>("save", async function(next) {
    if (this.isModified("password") && typeof this.password === "string") {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default User;
