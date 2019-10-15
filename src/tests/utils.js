import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { mount } from 'enzyme'
import { render } from '@testing-library/react'
import fs from 'fs'
import configureStore from 'redux-mock-store'
import { createStore } from 'redux'
import { withFormik, Formik, Form } from 'formik'

import store from '../store/configureStore' 


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

export const renderWithRouter = (
	ui,
	{
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
	} = {}
) => {
	const Wrapper = ({ children }) => (
		<Router history={history}>{children}</Router>
	)
	return {
		...render(ui, { wrapper: Wrapper }),
		history,
	}
}

export const renderWithRedux = (
	ui,
	state = {},
	wrapper
) => render(
	(
		<Provider store={mockStore(state)}>
			<StaticRouter>
				{ui}
			</StaticRouter>
		</Provider>
	),
	{ wrapper }
)

// export const FormikWrapper = ({ ui }) => withFormik({
// 	mapPropsToValues: () => {},
// 	handleSubmit: () => jest.fn()
// })(formikProps => (
// 	<form onSubmit={formikProps.handleSubmit} >
// 		{ui} 
// 	</form>
// ))

export const FormikWrapper = ({ children }) => (
	<Formik
		initialValues={{}}
		onSubmit={() => {}}
		render={props => (
			<Form>
				{children}
			</Form>
		)}
	/>
)