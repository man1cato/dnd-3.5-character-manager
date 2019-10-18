import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import ProfileRoute from './ProfileRoute'
import ProfilesRoute from './ProfilesRoute'

import LoginPage from '../pages/LoginPage/LoginPage'
import CharacterCreationPage from '../pages/CharacterCreationPage/CharacterCreationPage'
import CharacterSelectionPage from '../pages/CharacterSelectionPage/CharacterSelectionPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import StatsPage from '../pages/StatsPage/StatsPage'
import CombatPage from '../pages/CombatPage/CombatPage'
import EquipmentPage from '../pages/EquipmentPage/EquipmentPage'
import SpellbookPage from '../pages/SpellbookPage/SpellbookPage'
import CompanionPage from '../pages/CompanionPage/CompanionPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import UnderConstructionPage from '../pages/UnderConstructionPage'


export const history = createBrowserHistory()

const AppRouter = ({ appHistory = history }) => (
	<Router history={appHistory}>
		<Switch>
			<PublicRoute path="/" component={LoginPage} exact={true}/>
			<PrivateRoute path="/create" pageTitle="Character Creation" component={CharacterCreationPage} />
			<ProfilesRoute path="/select" pageTitle="Character Selection" component={CharacterSelectionPage} />
			<ProfileRoute path="/profile" pageTitle="Character Profile" component={ProfilePage} />
			<ProfileRoute path="/stats" pageTitle="Character Stats" component={StatsPage} />
			<ProfileRoute path="/combat" pageTitle="Combat" component={CombatPage} />
			<ProfileRoute path="/equipment" pageTitle="Equipment" component={EquipmentPage} />
			<ProfileRoute path="/spellbook" pageTitle="Spellbook" component={SpellbookPage} />
			<ProfileRoute path="/companion" pageTitle="Companion" component={CompanionPage} />
			<ProfileRoute path="/underconstruction" pageTitle="Under Construction" component={UnderConstructionPage} />
			<Route component={NotFoundPage} />
		</Switch>
	</Router>
)

export default AppRouter