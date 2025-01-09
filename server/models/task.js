import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const taskModel = mongoose.model('tasks', taskSchema);

export default taskModel;

