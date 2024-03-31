import Users, { ToDo } from "../models/ToDo.js";
import { validateUserId } from "../validations/UserValidations.js";

export async function addTodo(req, res){
    try {
        const { userId, title, description } = req.body;
        await validateUserId(userId);
        const newTodo = new ToDo({
            title,
            description
        })
        await Users.updateOne({ userId }, { $push: {
            tasks: newTodo
        }})
        res.status(200).json({newTodo});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

export async function getTodos(req, res) {
    try {
        const { id: userId } = req.params;
        await validateUserId(userId);
        const userTodos = await Users.findOne({ userId})
        res.status(200).json({todos: userTodos.tasks});
    }catch(error) {
        res.status(500).json({error: error.message});
    }
}

export async function updateTodo(req, res){
    try {
        const { userId, todoId, title, description } = req.body;
        if(!title && !description) {
            throw new Error("Missing data to update");
        }
        await validateUserId(userId);
        const updateCondition = {};
        if(title) {
            updateCondition["tasks.$.title"] =  title
        }
        if(description) {
            updateCondition["tasks.$.description"] =  description
        }

        await validateUserId(userId);
        await Users.updateOne({ userId, "tasks._id": todoId }, { $set: updateCondition});
        res.status(200).json({message: "Updated the todo successfully"});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

export async function deleteTodo(req, res) {
    try {
        const { userId, todoId } = req.body;


        await validateUserId(userId);
        if(!todoId) {
            throw new Error("Todo id is required");
        }
        await Users.updateOne({ userId }, { $pull: {
            tasks: { _id: todoId}
        }});
        res.status(200).json({message: "Deleted the todo successfully"});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

export async function deleteUser(req, res) {
    try {
        const { userId } = req.body;
        await validateUserId(userId);
        await Users.deleteOne({ userId });
        res.status(200).json({message: "Deleted the user successfully"});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}