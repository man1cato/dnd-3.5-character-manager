import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import CreatorFormFooter from './CreatorFormFooter'


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
    const { container } = render(<CreatorFormFooter {...props} />)
    expect(container.firstChild).toMatchSnapshot()
})