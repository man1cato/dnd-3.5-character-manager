import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import ProfileRoute from './ProfileRoute'
import ProfilesRoute from './ProfilesRoute'

import LoginPage from '../components/LoginPage'
import CharacterCreationPage from '../components/CharacterCreationPage'
import CharacterSelectionPage from '../components/CharacterSelectionPage'
import ProfilePage from '../components/ProfilePage'
import StatsPage from '../components/StatsPage'
import CombatPage from '../components/CombatPage'
import EquipmentPage from '../components/EquipmentPage'
import SpellbookPage from '../components/SpellbookPage'
import CompanionPage from '../components/CompanionPage'
import NotFoundPage from '../components/NotFoundPage'
import UnderConstructionPage from '../components/UnderConstructionPage'

export const history = createBrowserHistory()

const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<PublicRoute path="/" component={LoginPage} exact={true}/>
			<PrivateRoute path="/create" component={CharacterCreationPage} />
			<ProfilesRoute path="/select" component={CharacterSelectionPage} />
			<ProfileRoute path="/profile" component={ProfilePage} />
			<ProfileRoute path="/stats" component={StatsPage} />
			<ProfileRoute path="/combat" component={CombatPage} />
			<ProfileRoute path="/equipment" component={EquipmentPage} />
			<ProfileRoute path="/spellbook" component={SpellbookPage} />
			<ProfileRoute path="/companion" component={CompanionPage} />
			<ProfileRoute path="/underconstruction" component={UnderConstructionPage} />
			<Route component={NotFoundPage} />
		</Switch>
	</Router>
)

export default AppRouter