import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {login, logout} from './actions/auth';
import {startSetProfile} from './actions/profile';
import {startSetSpells} from './actions/spells';
import {startSetSkills} from './actions/skills';
import {startSetFeats} from './actions/feats';
import {startSetSpecialAbilities} from './actions/specialAbilities';
import {startSetItems} from './actions/items';
import {startSetRaces} from './actions/races';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};


ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        console.log('logged in');
        store.dispatch(login(user.uid));
        store.dispatch(startSetSpells());
        store.dispatch(startSetSkills());
        store.dispatch(startSetItems());
        await store.dispatch(startSetFeats());
        await store.dispatch(startSetSpecialAbilities());

        const profiles = await store.dispatch(startSetProfile(user.uid));
        console.log('profiles:', profiles);
        
        if (!profiles) {
            console.log('No character profile');
            await store.dispatch(startSetRaces());
        }
        
        renderApp();

        if (history.location.pathname === '/') {
            if (!!profiles) {
                console.log('history push profile');
                history.push('/profile');
            } else {
                console.log('history push create');
                history.push('/create');
            }
        }
    } else {
        console.log('logged out');
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});
