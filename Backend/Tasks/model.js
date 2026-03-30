import { getTaskModel } from "../schema.js";

const CreateTask = async (data) => {
    try {
        const Model = getTaskModel();
        const newTask = await Model.create(data);
        return newTask;
    } catch (error) {
        throw new Error("Error creating task: " + error.message);
    };
};

const GetTaskList = async ({ limit = 10, page = 1 }) => {
    try {
        const Model = getTaskModel();
        const tasks = await Model.find({ deleted: false }).limit(limit).skip((page - 1) * limit);
        return tasks;
    } catch (error) {
        throw new Error("Error fetching tasks: " + error.message);
    };
};

const GetTaskDetails = async (id) => {
    try {
        const Model = getTaskModel();
        const task = await Model.findById(id);
        if (!task || task.deleted) {
            throw new Error("Task not found");
        }
        return task;
    } catch (error) {
        throw new Error("Error fetching task details: " + error.message);
    };
};

const UpdateTask = async (id, data) => {
    try {
        const Model = getTaskModel();
        const updatedTask = await Model.findByIdAndUpdate(id, data, { new: true });
        if (!updatedTask) {
            throw new Error("Task not found");
        }
        return updatedTask;
    } catch (error) {
        throw new Error("Error updating task: " + error.message);
    };
};

const DeleteTask = async (id) => {
    try {
        const Model = getTaskModel();
        const deletedTask = await Model.findByIdAndUpdate(id, { deleted_at: new Date(), deleted: true }, { new: true });
        if (!deletedTask) {
            throw new Error("Task not found");
        }
        return deletedTask;
    } catch (error) {
        throw new Error("Error deleting task: " + error.message);
    };
};

export default { CreateTask, GetTaskList, GetTaskDetails, UpdateTask, DeleteTask };
