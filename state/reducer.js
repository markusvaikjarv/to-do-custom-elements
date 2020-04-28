import {
	ADD_TODO,
	UPDATE_FILTER,
	CLEAR_COMPLETED,
	UPDATE_TODO_STATUS,
} from './actions';

export const VisibilityFilters = {
	SHOW_ALL: 'All',
	SHOW_ACTIVE: 'Active',
	SHOW_COMPLETED: 'Completed',
};

const INITIAL_STATE = {
	todos: [],
	filter: VisibilityFilters.SHOW_ALL
};

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case ADD_TODO:
		return {
			filter: state.filter,
			todos: [action.todo, ...state.todos],
		};
	case UPDATE_TODO_STATUS:
		return {
			filter: state.filter,
			todos: state.todos.map(todo =>
				todo.id === action.todo.id
					? { task: action.todo.task, complete: action.complete, id: todo.id }
					: todo,
			),
		};
	case UPDATE_FILTER:
		return {
			filter: action.filter,
			todos: state.todos,
		};
	case CLEAR_COMPLETED:
		return {
			filter: state.filter,
			todos: state.todos.filter(todo => !todo.complete),
		};
	default:
		return state;
	}
};