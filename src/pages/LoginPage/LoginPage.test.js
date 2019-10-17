import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import LoginPage from './LoginPage'


test('should render login page correctly', () => {
    const { container } = render(<LoginPage />)
    expect(container).toMatchSnapshot()
})

// test('should trigger startLogin on button click', () => {
//     const startLogin = jest.fn()
//     const wrapper = shallow(<LoginPage startLogin={startLogin} />)
//     wrapper.find('button').simulate('click')
//     expect(startLogin).toHaveBeenCalled()
// })