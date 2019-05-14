import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import LoginPage from '../components/LoginPage';
import CharacterCreationPage from '../components/CharacterCreationPage';
import ProfilePage from '../components/ProfilePage';
import StatsPage from '../components/StatsPage';
import CombatPage from '../components/CombatPage';
import EquipmentPage from '../components/EquipmentPage';
import SpellbookPage from '../components/SpellbookPage';
import CompanionPage from '../components/CompanionPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/create" component={CharacterCreationPage} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <PrivateRoute path="/stats" component={StatsPage} />
                <PrivateRoute path="/combat" component={CombatPage} />
                <PrivateRoute path="/equipment" component={EquipmentPage} />
                <PrivateRoute path="/spellbook" component={SpellbookPage} />
                <PrivateRoute path="/companion" component={CompanionPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
