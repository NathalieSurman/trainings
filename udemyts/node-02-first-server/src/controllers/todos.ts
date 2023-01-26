import { RequestHandler} from "express" //--> This is available bec we installed express
import { Todo } from "../models/todo"

const TODOS: Todo[] = []

//-- RequestHandler is defined to look like --> req, res, next --//
export const createTodo: RequestHandler = (req, res, next) => {
    //-- We want to make a typecasting (req.body as {text: string}).text when we know what we want Ts to do ---//
    const text = (req.body as {text: string}).text
    const newTodo = new Todo(Math.random().toString(), text)

    TODOS.push(newTodo)

    res.status(201).json({message: "Created the todo.", createTodo: newTodo})
}


export const getTodos: RequestHandler = (req, res, next ) => {
    res.json({todos: TODOS})
}

export const updateTodos: RequestHandler<{id: string}> = (req, res, next ) => {
  //--we want to get the date and to update it ---//
    const todoId = req.params.id

    const updateText = (req.body as {text: string}).text

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if(todoIndex < 0){
        throw new Error("Cannot find your todo")
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updateText)

    res.status(201).json({message: "It has Updated", updateText: TODOS[todoIndex]})
}

export const deleteTodos: RequestHandler = (req, res, next ) => {
    const todoId = req.params.id

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if(todoIndex < 0){
    throw new Error("Cannot find your todo")
    }
    TODOS.splice(todoIndex, 1 )

    res.json({message: "Your todo has been removed"})
}