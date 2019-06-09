import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import { startSetProfile, deleteProfile } from './actions/profile'
import { startGetProfiles, deleteProfiles } from './actions/profiles'
import setApi from './actions/api'

import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'

console.log('run app.js')
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




//Auth listener for user login
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		console.log('logged in')
		store.dispatch(startGetProfiles(user.uid)).then(() => {
			console.log('trigger dispatch chain')
			const selectedCharacterId = localStorage.getItem('selectedCharacterId')
			const profiles = store.getState().profiles
			console.log('profiles:', profiles)
			if (selectedCharacterId) {
				return store.dispatch(startSetProfile(user.uid, selectedCharacterId))
			} 
			if (Object.keys(profiles).length === 1) {
				return store.dispatch(startSetProfile(user.uid, profiles[0].id)) 
			} 
		}).then(() => {
			const profile = store.getState().profile
			console.log('profile:', profile)
			const profiles = store.getState().profiles
			store.dispatch(login(user.uid))
			renderApp()
			if (!!profile.id) {
				console.log('pushing to profile')
				history.push('/profile')
			} else if (profiles.length > 0) {
				console.log('pushing to select')
				history.push('/select')
			} else {
				console.log('pushing to create')
				history.push('/create')
			}
		})
	} else {
		console.log('logged out')
		store.dispatch(logout())
		renderApp()
		history.push('/')
		store.dispatch(deleteProfile())
		store.dispatch(deleteProfiles())
	}
})