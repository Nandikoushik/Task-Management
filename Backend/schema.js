import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "ongoing", "completed"],
        default: "pending"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: { type: Date, default: null },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now, immutable: true },
}, {
    versionKey: false,
     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

let Task;

export const initSchema = () => {
    Task = mongoose.model("Task", taskSchema);
}

export const getTaskModel = () => {
    if (!Task) initSchema();
    return Task;
}