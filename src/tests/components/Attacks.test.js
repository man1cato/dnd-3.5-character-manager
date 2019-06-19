import React from 'react'
import { shallow } from 'enzyme'

import Attacks from '../../components/Attacks'
import { characterOne } from '../utils/seedDatabase'


const handleChange = jest.fn()
let wrapper
beforeEach(() => {
    wrapper = shallow(<Attacks attacks={characterOne.attacks} handleChange={handleChange} />)
})

test('should render attacks with default profile data', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should trigger handleChange when input changes', () => {
	wrapper.find('#melee').simulate('change', {
        target: { value: 3 }
    })
    expect(handleChange).toHaveBeenCalledWith({ target: { value: 3 }})
})