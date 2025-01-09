import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import todoModel from '../models/todo.js';

const router = express.Router();

router.post("/create-todo", verifyToken, async (req, res) => {
    const { todo } = req.body;
    const userId = req.userId;

    try {
      const newtodo = new todoModel({ todo, userId });
      await newtodo.save();
      res.status(200).json({ message: "todo created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating todo", error });
    }
});
  

router.get("/read-todos", verifyToken, async (req, res) => {
    const userId = req.userId;
    
    try {
        const todos = await todoModel.find({userId: userId});
        res.status(200).json({ message: "todo retreived successfully", todos });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});

router.patch("/update-todo/:id", verifyToken, async(req, res) => {
    const todoId = req.params.id;
    const { updatedtodo } = req.body;

    try {
        await todoModel.findByIdAndUpdate(todoId, { todo: updatedtodo });
        res.status(200).json({ message: "todo updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});


router.delete("/delete-todo/:id", verifyToken, async(req, res) => {
    const todoId = req.params.id;

    try {
        await todoModel.findOneAndDelete({_id: todoId});
        res.status(200).json({ message: "todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});

export { router as todoRouter };
