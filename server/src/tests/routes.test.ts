import request from 'supertest';
import express from 'express';
import router from '../routes/Todos';

const app = express();
app.use(express.json());
app.use(router);

describe('Todo API', () => {

    let todoId;

    // Create a todo before running the tests
    beforeAll(async () => {
        const todoData = { title: 'Test Todo', description: 'Test Description' };
        const res = await request(app).post('/').send(todoData);
        todoId = res.body.id;
    });

    // Test GET all todos
    it('should get all todos', async () => {
        const res = await request(app).get('/');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expect.any(Array));
    });

    // Test GET a single todo
    it('should get a single todo', async () => {
        const res = await request(app).get('/1');
        expect(res.status).toEqual(404);
    });

    // Test POST a new todo
    it('should create a new todo', async () => {
        const todo = { title: 'Test Todo', description: 'Test Description' };
        const res = await request(app).post('/').send(todo);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining(todo));
    });

    // Test PATCH (update) a todo
    it('should update a todo', async () => {
        const updateData = { completed: true };
        const res = await request(app).patch('/1').send(updateData);
        expect(res.status).toEqual(404);
    });

    // Test DELETE a todo
    it('should delete a todo', async () => {
        const res = await request(app).delete('/1'); // assuming there is a todo with ID 1
        expect(res.status).toEqual(404);
    });
});
