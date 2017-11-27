import { ADD_TODO, DELETE_TODO, CLEAR_TODOS} from '../js/constants.js';

export const addTodo = (todo, date) => {
	const action = {
		type: ADD_TODO,
		todo,
		date
	};
	return action;
};

export const deleteTodo = (id) => {
	const action = {
		type: DELETE_TODO,
		id
	};
	return action;
}

export const clearTodos = () => {
	const action = {
		type: CLEAR_TODOS
	};
	return action;
}