import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { login, logout } from './store/actions/auth'
import { startSetProfile, removeProfile } from './store/actions/profile'
import { startGetProfiles, removeProfiles } from './store/actions/profiles'
import setApi from './store/actions/api'

import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './pages/LoadingPage'


const store = configureStore()

const jsx = (
	<div className="app-container">
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</div>
)

let hasRendered = false

const renderApp = () => {
	if (!hasRendered) {
		store.dispatch(setApi()).then(() => {
			ReactDOM.render(jsx, document.getElementById('app'))
		})
		hasRendered = true
	}
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged(async (user) => {
	if (user) {
		console.log('logged in')
		await store.dispatch(startGetProfiles(user.uid))
		const profiles = store.getState().profiles
		const selectedCharacterId = localStorage.getItem('selectedCharacterId')
		const profileId = selectedCharacterId || profiles.length === 1 && profiles[0].id
		
		if (profileId) {
			await store.dispatch(startSetProfile(user.uid, profileId))
		} 
		
		store.dispatch(login(user.uid))		
		renderApp()
	} else {
		console.log('logged out')
		store.dispatch(removeProfile())
		store.dispatch(removeProfiles())
		store.dispatch(logout())
		renderApp()
	}
})