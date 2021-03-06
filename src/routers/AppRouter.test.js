import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Switch, Route } from 'react-router-dom'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import profile from '../test-utils/fixtures/profile'
import profiles from '../test-utils/fixtures/profiles'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import ProfileRoute from './ProfileRoute'
import ProfilesRoute from './ProfilesRoute'

import LoginPage from '../pages/LoginPage/LoginPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CharacterCreationPage from '../pages/CharacterCreationPage/CharacterCreationPage'
import CharacterSelectionPage from '../pages/CharacterSelectionPage/CharacterSelectionPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import { apiData } from '../test-utils/utils'


const mockStore = configureStore()

const createWrapper = (pathHistory, state) => mount(
	<Provider store={mockStore(state)}>
		<MemoryRouter
			initialEntries={pathHistory}
		>
			<Switch>
				<PublicRoute path="/" component={LoginPage} exact={true}/>
				<ProfileRoute path="/profile" component={ProfilePage} />
				<PrivateRoute path="/create" component={CharacterCreationPage} />
				<ProfilesRoute path="/select" component={CharacterSelectionPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</MemoryRouter>   
	</Provider>
)


let api, wrapper, state

beforeAll(async () => {
	api = await apiData()
})


test('should be directed to 404 upon invalid path', () => {
	wrapper = createWrapper(['/wrongpath'], {})
	expect(wrapper.exists(NotFoundPage)).toEqual(true)
})

describe('authenticated user with /profile route', () => {
	beforeEach(() => {
		state = {
			auth: { uid: 'abc123' },
			profile: {},
			profiles: [],
			...api
		}
	})
	const pathHistory = ['/','/profile']

	test('should be redirected to /create if no profile exists', () => {
		wrapper = createWrapper(pathHistory, state)
		expect(wrapper.exists(ProfilePage)).toEqual(false)
		expect(wrapper.exists(CharacterCreationPage)).toEqual(true)
	})

	test('should be directed to /profile if one profile exists', () => {
		state.profile = profile
		wrapper = createWrapper(pathHistory, state)
		expect(wrapper.exists(LoginPage)).toEqual(false)
		expect(wrapper.exists(ProfilePage)).toEqual(true)
	})
	
	test('should be redirected to /select if multiple profiles exist', () => {
		state.profiles = profiles
		wrapper = createWrapper(pathHistory, state)
		expect(wrapper.exists(ProfilePage)).toEqual(false)
		expect(wrapper.exists(CharacterSelectionPage)).toEqual(true)
	})
})

