import { DataTypes, Model, ModelCtor } from 'sequelize';
import { Todo, sequelize } from '../models/Todo';

describe('Todo Model', () => {
	let mockTodoModel: ModelCtor<Model>;

	beforeAll(() => {
		const MockSequelize = require('sequelize-mock');
		var DBConnectionMock = new MockSequelize();
		mockTodoModel = DBConnectionMock.define('Todo', {
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
			},
			completed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		});

		jest.spyOn(sequelize, 'define').mockImplementation(() => mockTodoModel);
	});

	// Test if the Todo model is defined correctly
	it('should define the Todo model correctly', () => {
		expect(sequelize.define).toHaveBeenCalledWith('Todo', {
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
			},
			completed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		});
	});
});
