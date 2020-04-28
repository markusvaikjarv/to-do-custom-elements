import { createStore } from 'redux';
import { reducer } from './reducer';

const STORAGE_KEY = '__pwa_todo__';

const persistState = state => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const loadState = () => {
	const json = localStorage.getItem(STORAGE_KEY);
	return json ? JSON.parse(json) : undefined;
};

export const store = createStore(reducer, loadState());

store.subscribe(() => {
	persistState(store.getState());
});