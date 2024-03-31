import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


import AuthRoutes from "./routes/AuthRoutes.js";
import TodoRoutes from "./routes/TodoRoutes.js";

const app = express();
const PORT = 3008;

app.use(bodyParser.json());

app.use('/', AuthRoutes);
app.use("/todos", TodoRoutes);


const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://Abhinay:6DhyJTgIoqo50EdP@web3cluster.mxahtxl.mongodb.net/toDoDb?retryWrites=true&w=majority&appName=Web3Cluster");

        app.listen(PORT, () => {
            console.log(`The Server is running on the port ${PORT}`)
        })
    } catch(error) {
        console.log("Error While Starting The Server", error.message);
    }
}


startServer();

export default app;
