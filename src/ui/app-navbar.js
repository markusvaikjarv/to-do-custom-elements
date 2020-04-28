import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-tabs';

import { connect } from '../util';
import { store } from '../state/store';
import { Routes } from '../conf';

class AppNavbar extends connect(store)(LitElement) {
	static get properties() {
		return {
			hasTodos: { type: Boolean },
		};
	}

	stateChanged(state) {
		this.hasTodos = Boolean(state.todos.length);
	}

	static get styles() {
		return css`
			vaadin-tabs {
				margin-bottom: 0.3em;
			}
		`;
	}

	getTab() {
		for (let i = 0; i < Routes.length; i++) {
			const { path } = Routes[i];
			if (window.location.href.endsWith(path)) {
				return i;
			}
		}
	}

	validateRoute() {
		if (window.location.href.endsWith('/statistics') && !this.hasTodos) {
			window.location.href = '/';
		}
	}

	render() {
		this.validateRoute();
		return html`
			<vaadin-tabs selected=${this.getTab()}>
				<vaadin-tab>
					<a href="/">Todos</a>
				</vaadin-tab>
				<vaadin-tab
					?disabled="${!this.hasTodos}"
				>
					<a href="/statistics">Statistics</a>
				</vaadin-tab>
			</vaadin-tabs>
		`;
	}
}

customElements.define('app-navbar', AppNavbar);