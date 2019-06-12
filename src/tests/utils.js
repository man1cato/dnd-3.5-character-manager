import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import fs from 'fs'
import configureStore from 'redux-mock-store'

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