import { useState, useEffect } from "react";
import Form from "./Form";
import Todo from "./Todo";
import axios from "axios";
let id = 999999999;

const TodoList = () => {

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/todos";

    const [todos, setTodos] = useState<{id: number, title: string, description: string, completed: boolean, createdAt: Date}[]>([])
    const [selectedTodo, setSelectedTodo] = useState<Date | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        axios.get(apiUrl)
          .then(response => setTodos(response.data))
          .catch(error => console.error("Error fetching todos:", error));
    }, [apiUrl]);

    const createTodo = (title: string, description: string, completed: boolean) => {
        axios.post(apiUrl, {title, description, completed})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setTodos([...todos, {id: id, title, description, completed, createdAt: new Date()}])
        id++;
    }

    const deleteTodo = (id: number) => {
        axios.delete(`${apiUrl}/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const updateTodo = (id: number) => {
        axios.patch(`${apiUrl}/${id}`, {completed: !todos.find(todo => todo.id === id)?.completed})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }

    const handleTitleClick = (id: number) => {
        setSelectedTodo(todos.find(todo => todo.id === id)?.createdAt || null);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="container mx-auto my-20 p-8 bg-primary">
            <h3 className="text-3xl font-primary text-white mb-4">Todo List</h3>
            <Form createTodo={createTodo} />
            <div className="border-t border-white my-4"></div>
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} titleClick={handleTitleClick} />
            ))}

            {showPopup && selectedTodo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md">
                        {selectedTodo && (
                            <div>
                                <p>Created Date: {selectedTodo.toString()}</p>
                            </div>
                        )}
                        <button className="mt-4 bg-primary text-white rounded-md p-2" onClick={handleClosePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoList;
