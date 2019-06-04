import React from 'react'
import { shallow } from 'enzyme'

import CreatorFormFooter from '../../components/CreatorFormFooter'


const handleBack = jest.fn() 
const handleNext = jest.fn() 

const props = {
    page: 1,
    pages: ['Page1', 'Page2', 'Page3'],
    handleBack,
    handleNext,
    isSubmitting: false,
    isValid: true
}

test('should render CreatorFormFooter', () => {
    const wrapper = shallow(<CreatorFormFooter {...props} />)
    expect(wrapper).toMatchSnapshot()
})