import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import { startSetProfile, removeProfile } from './actions/profile'
import { startGetProfiles, removeProfiles } from './actions/profiles'
import setApi from './actions/api'

import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'


const store = configureStore()

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

let hasRendered = false

const renderApp = () => {
	if (!hasRendered) {
		store.dispatch(setApi()).then(() => {
			ReactDOM.render(jsx, document.getElementById('app'))
		})
		hasRendered = true
		console.log('rendered app')
	}
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged(async (user) => {
	if (user) {
		await store.dispatch(startGetProfiles(user.uid))
		
		const profiles = store.getState().profiles
		const selectedCharacterId = localStorage.getItem('selectedCharacterId')
		const profileId = selectedCharacterId || profiles.length === 1 && profiles[0].id
		
		if (profileId) {
			await store.dispatch(startSetProfile(user.uid, profileId))
		} 
		const profile = store.getState().profile
		
		renderApp()
		store.dispatch(login(user.uid))
		// if (!!profile.id) {
		// 	console.log('pushing to profile')
		// 	history.push('/profile')
		// } else if (profiles.length > 0) {
		// 	console.log('pushing to select')
		// 	history.push('/select')
		// } else {
		// 	console.log('pushing to create')
		// 	history.push('/create')
		// }
		
		
	} else {
		console.log('logged out')
		store.dispatch(removeProfile())
		store.dispatch(removeProfiles())
		store.dispatch(logout())
		renderApp()
		// history.push('/')
	}
})