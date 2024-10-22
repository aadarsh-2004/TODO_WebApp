const router = require('express').Router();
const { Router } = require('express');
const List =require('../models/List');
const User =require('../models/user');

// Add Task API
router.post('/addtask',  async function (req, res) {
    const {title, body,id}=req.body;
    const existingUser= await User.findById(id);
    if(!existingUser){
        return res.status(400).json({ error: "you are not allowed" });
    }
    const listdata= new List({title,body,user:existingUser});
    await listdata.save();
    existingUser.list.push(listdata);
    await existingUser.save();
    res.json("task added");


});

// Update Task API
router.put('/updatetask/:id/:userid', async function (req, res) {
    const taskId = req.params.id;
    const userId = req.params.userid;
    const { title, body } = req.body;

    try {
        // Ensure the task exists
        const taskToUpdate = await List.findById(taskId);
        if (!taskToUpdate) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Ensure the task belongs to the user
        if (taskToUpdate.user.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized: Task does not belong to this user" });
        }

        // Update the task
        taskToUpdate.title = title;
        taskToUpdate.body = body;
        await taskToUpdate.save(); // Save the updated task

        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Server error during task update" });
    }
});



router.delete('/deletetask/:id/:userid', async function (req, res) {

        const taskId = req.params.id;
        const userId = req.params.userid;


        // Ensure task exists
        const taskToDelete = await List.findById(taskId);
        if (!taskToDelete) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Ensure the task belongs to the user
        if (taskToDelete.user.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized: Task does not belong to this user" });
        }

        // Delete the task
        await List.deleteOne({ _id: taskId });

        // Remove task reference from user's list
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        user.list = user.list.filter(task => task.toString() !== taskId);
        await user.save();

        res.status(200).json({ message: "Task deleted successfully" });

    
});



// get all task according to user
router.get('/showAllTask/:id',  async function (req, res) {
    const list  = await List.find({user:req.params.id});
    res.json(list);

})


module.exports =router;