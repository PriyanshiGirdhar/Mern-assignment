import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import taskModel from '../models/task.js';

const router = express.Router();

router.post("/create-task", verifyToken, async (req, res) => {
    const { task } = req.body;
    const userId = req.userId;

    try {
      const newtask = new taskModel({ task, userId });
      await newtask.save();
      res.status(200).json({ message: "task created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
});
  

router.get("/read-tasks", verifyToken, async (req, res) => {
    const userId = req.userId;
    
    try {
        const tasks = await taskModel.find({userId: userId});
        res.status(200).json({ message: "task retreived successfully", tasks });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});

router.patch("/update-task/:id", verifyToken, async(req, res) => {
    const taskId = req.params.id;
    const { updatedtask } = req.body;

    try {
        await taskModel.findByIdAndUpdate(taskId, { task: updatedtask });
        res.status(200).json({ message: "task updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});


router.delete("/delete-task/:id", verifyToken, async(req, res) => {
    const taskId = req.params.id;

    try {
        await taskModel.findOneAndDelete({_id: taskId});
        res.status(200).json({ message: "task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});

export { router as taskRouter };
