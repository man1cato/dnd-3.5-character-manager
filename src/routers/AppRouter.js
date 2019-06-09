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
			<PrivateRoute path="/select" component={CharacterSelectionPage} />
			<PrivateRoute path="/profile" component={ProfilePage} />
			<PrivateRoute path="/stats" component={StatsPage} />
			<PrivateRoute path="/combat" component={CombatPage} />
			<PrivateRoute path="/equipment" component={EquipmentPage} />
			<PrivateRoute path="/spellbook" component={SpellbookPage} />
			<PrivateRoute path="/companion" component={CompanionPage} />
			<PrivateRoute path="/underconstruction" component={UnderConstructionPage} />
			<Route component={NotFoundPage} />
		</Switch>
	</Router>
)

export default AppRouter