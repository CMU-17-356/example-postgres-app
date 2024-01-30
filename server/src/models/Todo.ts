require("dotenv").config();
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URL as string, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: true,
	},
	define: {
		timestamps: false,
	},
});

const Todo = sequelize.define('Todo', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: new Date(),
	},
	completed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

export { Todo, sequelize };
