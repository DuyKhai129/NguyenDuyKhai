import mongoose, { Schema, Document } from "mongoose";

interface IResource extends Document {
    name: string;
    description: string;
}

const ResourceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

export default mongoose.model<IResource>("Resource", ResourceSchema);
