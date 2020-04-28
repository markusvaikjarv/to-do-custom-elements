import { LitElement, html, css } from 'lit-element';
import { connect } from '../util';
import { store } from '../state/store.js';

import '@vaadin/vaadin-progress-bar';

class StatisticsView extends connect(store)(LitElement) {
	static get properties() {
		return {
			allTasks: { type: Number },
			completedTasks: { type: Number },
			activeTasks: { type: Number },
			donePercentage: { type: Number },
		};
	}

	stateChanged(state) {
		this.allTasks = state.todos.length;
		this.completedTasks = state.todos.filter(todo => todo.complete).length;
		this.activeTasks = this.allTasks - this.completedTasks;
		this.donePercentage = (this.completedTasks / this.allTasks).toFixed(2) * 100;
	}

	static get styles() {
		return css`
			:host {
				font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI',
					Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
					'Segoe UI Symbol';

			}
		`;
	}
	render() {
		return html`
			<p>You have ${this.completedTasks} completed task(s) and ${this.activeTasks} active task(s) in your to-do list.</p>
			<vaadin-progress-bar
				value="${this.donePercentage / 100}"
			>
			</vaadin-progress-bar>
			<p>${this.donePercentage}% of tasks are completed</p>
		`;
	}
}

customElements.define('statistics-view', StatisticsView);