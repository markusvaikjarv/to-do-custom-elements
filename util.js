// Subscribes to redux store and calls the 'stateChanged' method on component on any state changes
export const connect = (store) => (baseElement) => class extends baseElement {
	connectedCallback() {
		if (super.connectedCallback) {
			super.connectedCallback();
		}
		this._storeUnsubscribe = store.subscribe(() => this.stateChanged(store.getState()));
		this.stateChanged(store.getState());
	}
	disconnectedCallback() {
		this._storeUnsubscribe();
		if (super.disconnectedCallback) {
			super.disconnectedCallback();
		}
	}

	// eslint-disable-next-line no-unused-vars
	stateChanged(_) { }
};