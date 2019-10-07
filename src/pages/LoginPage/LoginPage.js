import React from 'react'
import { connect } from 'react-redux'

import { startLogin } from '../../store/actions/auth'
import './LoginPage.scss'


export const LoginPage = ({ startLogin }) => (
    <div className="LoginPage">
        <div className="LoginPage__box">
            <h1 className="LoginPage__title">D&D 3.5e Character Manager</h1>
            <button className="button--primary" onClick={startLogin}>Login with Google</button>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
