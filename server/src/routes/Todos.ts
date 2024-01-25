import express, { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { Model } from 'sequelize/types';

const router = express.Router();

interface TodoInstance extends Model {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    status: string;
}

// GET all todos
router.get('/', async (_req: Request, res: Response) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// GET a single todo
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            res.status(404).send('Todo not found');
            return;
        }

        res.json(todo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// POST a new todo
router.post('/', async (req: Request, res: Response) => {
    const { title, description } = req.body;

    try {
        const todo = await Todo.create({ title, description });
        res.json(todo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// PATCH (update) a todo
router.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const todo = await Todo.findByPk(id) as TodoInstance;
        if (!todo) {
            res.status(404).send('Todo not found');
            return;
        }

        todo.status = status;
        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// DELETE a todo
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            res.status(404).send('Todo not found');
            return;
        }

        await todo.destroy();
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

export default router;
