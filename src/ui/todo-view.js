import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

import { VisibilityFilters } from '../state/reducer';
import { store } from '../state/store';
import { connect } from '../util';
import {
	addTodo,
	updateTodoStatus,
	updateFilter,
	clearCompleted,
} from '../state/actions.js';

class TodoView extends connect(store)(LitElement) {
	stateChanged(state) {
		this.todos = state.todos;
		this.filter = state.filter;
	}

	static get properties() {
		return {
			todos: { type: Array },
			filter: { type: String },
			task: { type: String },
		};
	}

	addTodo() {
		if (this.task) {
			store.dispatch(addTodo(this.task));
			this.task = '';
		}
	}

	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addTodo();
		}
	}

	updateTask(e) {
		this.task = e.target.value;
	}

	updateTodoStatus(updatedTodo, isCompleted) {
		store.dispatch(updateTodoStatus(updatedTodo, isCompleted));
	}

	filterChanged(e) {
		store.dispatch(updateFilter(e.detail.value));
	}

	clearCompleted() {
		store.dispatch(clearCompleted());
	}

	applyFilters(todos) {
		switch (this.filter) {
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.complete);
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.complete);
		default:
			return todos;
		}
	}

	static get styles() {
		return css`
			:host {
				font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI',
					Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
					'Segoe UI Symbol';
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				height: 93%;
			}
			:host .todos-list {
				flex: 1;
				overflow-y: scroll;
			}


			:host .input-layout {
				display: flex;
				flex-wrap: wrap;
				width: 100%
			}

			vaadin-text-field {
				flex: 4;
				margin-right: 0.5vw;
			}

			vaadin-button.add-todo {
				min-width: 100px;
				flex: 1;
			}

			.todo-item {
				word-break: break-word;
			}
		`;
	}

	render() {
		return html`
			<div
				class="input-layout"
				@keyup="${this.shortcutListener}"
			>

				<vaadin-text-field
					placeholder="Task"
					value="${this.task || ''}"
					@change="${this.updateTask}"
				>
				</vaadin-text-field>

				<vaadin-button
					class="add-todo"
					theme="primary"
					@click="${this.addTodo}"
				>
					Add Todo
				</vaadin-button>
			</div>

			<div
				class="todos-list"
			>
				${this.applyFilters(this.todos).map(todo => html`
					<div class="todo-item">
						<vaadin-checkbox
							?checked="${todo.complete}"
							@change="${e => this.updateTodoStatus(todo, e.target.checked)}"
						>
						${todo.task}
						</vaadin-checkbox>
					</div>
				`)}
			</div>

			<vaadin-radio-group
					class="visibility-filters"
					value="${this.filter}"
					@value-changed="${this.filterChanged}"
				>
					${Object.values(VisibilityFilters).map(filter => html`
							<vaadin-radio-button value="${filter}">
								${filter}
							</vaadin-radio-button>
						`)}
				</vaadin-radio-group>

				<vaadin-button
					@click="${this.clearCompleted}"
				>
					Clear completed
				</vaadin-button>
		`;
	}
}

customElements.define('todo-view', TodoView);