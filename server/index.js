require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./Model/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOOSE_URI);

app.get("/api/todo/getAll", async (req, res) => {
    try {
        const response = await userModel.find();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

app.post("/api/todo/addTodo", async (req, res) => {
    try {
        const {name,describe} = req.body;
        const response = await userModel.create({name,  describe });
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

app.put("/api/todo/updateDone/:id",async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await userModel.findById({_id:id});
        await userModel.findByIdAndUpdate({_id :id},{$set:{done:!result.done}})
        res.json(result)
    }catch(err){
        res.json(err);
    }
});

app.delete("/api/todo/deleteTodo/:id",async (req, res)=>{
    const id = req.params.id;
    await userModel.findByIdAndDelete({_id:id})
    res.status(200).json({message:"delete successfully"})
})

app.listen(8080, async () => {
    console.log("Server is running");
});
