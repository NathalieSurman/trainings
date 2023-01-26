import { Router } from "express";
import { createTodo, getTodos, updateTodos, deleteTodos } from "../controllers/todos";
const router = Router()

//--We want to post --//
router.post("/", createTodo)

//--We want to Get --//
router.get("/", getTodos)

//--We want to update --//
router.patch("/:id", updateTodos)

//--We want to DELETE --//
router.delete("/", deleteTodos)

export default router