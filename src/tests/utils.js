import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import fs from 'fs'
import configureStore from 'redux-mock-store'
import { Formik, Form } from 'formik'


const mockStore = configureStore()

export const apiData = async () => {
	const api = await fs.promises.readFile('src/tests/fixtures/api.json')
	return JSON.parse(api)
}

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