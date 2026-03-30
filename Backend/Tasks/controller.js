import Task from "./model.js";
const addTask= async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTask = await Task.CreateTask({ title, description, status });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Error creating task", error });
    };
};

const getTaskList = async (req, res) => {
    try {
        const { limit=10, page=1 } = req.query;
        const tasks = await Task.GetTaskList({ limit, page });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks", error });
    };
};


const getTaskDetails = async (req, res) => {
    try {
        const task = await Task.GetTaskDetails(req.params.id);    
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task details", error });
    };
};

const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;    
        const updatedTask = await Task.UpdateTask(
            req.params.id,
            { title, description, status },
            { new: true }
        );  
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }   
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    };
};

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.DeleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }   
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    };
};

export { getTaskList, getTaskDetails, updateTask, deleteTask ,addTask };