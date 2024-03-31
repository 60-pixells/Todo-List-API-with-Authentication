import mongoose, { Schema } from "mongoose";


export const ToDoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    tasks: [ToDoSchema]
})


const Users = mongoose.model(
    "User",
    UserSchema,
    "Users"
);

export const ToDo = mongoose.model(
    "ToDo",
    ToDoSchema,
)

export default Users;