import React from 'react'
// import { connect } from 'react-redux'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { firebase } from '../../firebase/firebase'
// import { startLogin } from '../../store/actions/auth'
import './LoginPage.scss'


const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ]
}

export const LoginPage = props => {
    return (
        <div className="LoginPage">
            <div className="LoginPage__box">
                <h1 className="LoginPage__title">D&D 3.5e Character Manager</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        </div>
    )
}

// const mapDispatchToProps = dispatch => ({
//     startLogin: () => dispatch(startLogin())
// })

// export default connect(undefined, mapDispatchToProps)(LoginPage)

export default LoginPage
