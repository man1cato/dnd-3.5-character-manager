import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import { render } from '@testing-library/react'
import fs from 'fs'
import configureStore from 'redux-mock-store'
import { createStore } from 'redux'


const mockStore = configureStore()

export const apiData = async () => {
	const api = await fs.promises.readFile('src/tests/fixtures/api.json')
	return JSON.parse(api)
}

export const createConnectedWrapper = (ConnectedComponent, state) => mount(
	<Provider store={mockStore(state)}>
		<StaticRouter>
			<ConnectedComponent />
		</StaticRouter>
	</Provider>
)


const defaultReducer = (state = {}, action) => state
export const renderWithRedux = (component, initialState = {}, reducer = defaultReducer) => {
	const store = createStore(reducer, initialState)
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store
	}
}