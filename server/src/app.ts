require("dotenv").config();
import express, { Request, Response } from 'express';
import todoRoutes from './routes/Todos';
import { sequelize } from './models/Todo';

const app = express();
const cors = require('cors');

app.use(cors());
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/todos', todoRoutes);

// Sync the model with the database
sequelize.sync({ force: true })
    .then(() => {
        console.log('Database synced');
    })
    .catch((error: any) => {
        console.error('Error syncing database:', error);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
