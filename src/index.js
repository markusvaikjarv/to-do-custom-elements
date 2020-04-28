import { Router } from '@vaadin/router';

import { Routes } from './conf';
import './style.css';
import './ui/todo-view';
import './ui/statistics-view';
import './ui/app-navbar';

const sw = 'service-worker.js';

navigator.serviceWorker
	.register(sw)
	.then(registration => {
		registration.onupdatefound = () => {
			const installingWorker = registration.installing;
			if (installingWorker == null) {
				return;
			}
			installingWorker.onstatechange = () => {
				if (installingWorker.state === 'installed') {
					if (navigator.serviceWorker.controller) {
						console.log(
							'New content is available and will be used when all ' +
							'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
						);
					} else {
						console.log('Content is cached for offline use.');
					}
				}
			};
		};
	})
	.catch(error => {
		console.error('Error during service worker registration:', error);
	});

window.addEventListener('load', () => {
	initRouter();
});

function initRouter() {
	const router = new Router(document.querySelector('.page-content'));
	router.setRoutes(Routes);
}