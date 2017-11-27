import { ADD_TODO, DELETE_TODO, CLEAR_TODOS } from '../js/constants.js';
import { bake_cookie, read_cookie} from 'sfcookies';

const todo = (action) => {
	return {
		todo: action.todo,
		id: Math.random(),
		date: action.date
	}
};

const removeId = (state = [], id) => {
	let todos = state.filter(todo => {
		return todo.id !== id;
	});
	return todos;
};

const todos = (state = [], action) => {
	let todos = null;
	state = read_cookie('todos');
	switch (action.type){
		case ADD_TODO:
			todos = [...state, todo(action)];
			bake_cookie('todos', todos);
			return todos;
		case DELETE_TODO:
			todos = removeId(state, action.id);
			bake_cookie('todos', todos);
			return todos;
		case CLEAR_TODOS:
			todos = [];
			bake_cookie('todos', todos);
			return todos;
		default:
			return state;
	}
};

export default todos;