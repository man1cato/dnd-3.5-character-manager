import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter, NavLink } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import profiles from '../fixtures/profiles'
import ConnectedHeader, { Header } from '../../components/Header/Header'

const mockStore = configureStore()
const createConnectedWrapper = (state) => mount(
    <Provider store={mockStore(state)}>
        <StaticRouter>
            <ConnectedHeader /> 
        </StaticRouter>
	</Provider>
)

let wrapper

test('should render Header correctly', () => {
    wrapper = shallow(<Header startLogout={() => {}}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should call startLogout on button click', () => {
    const startLogout = jest.fn()
    wrapper = shallow(<Header startLogout={startLogout}/>)
    wrapper.find('button').simulate('click')
    expect(startLogout).toHaveBeenCalled()
})

test('should show select character icon when profiles in store', () => {
    wrapper = createConnectedWrapper({ profiles })
    expect(wrapper.find(NavLink).at(1).props().hidden).toEqual(false)
})