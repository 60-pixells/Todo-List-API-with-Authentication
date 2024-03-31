import { Router } from "express";
import { addTodo, getTodos, updateTodo, deleteTodo, deleteUser } from "../controllers/TodoController.js";
import { authenticateToken } from "../middlewares/JwtMiddleWare.js";

const router = Router();

router.post("/" ,authenticateToken , addTodo);
router.get("/:id", authenticateToken, getTodos);
router.put("/", authenticateToken, updateTodo)
router.delete("/", authenticateToken, deleteTodo);
router.delete("/user", authenticateToken, deleteUser)

export default router;