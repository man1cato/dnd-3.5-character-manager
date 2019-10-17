import React from 'react'
import { fireEvent } from '@testing-library/react'

import { renderWithRedux } from '../../tests/utils'
import { Header } from './Header'


const startLogout = jest.fn()
let props
beforeAll(() => {
    props = {
        pageTitle: 'Profile',
        startLogout
    }
})


test('should render Header with swap button hidden', () => {
    const { container, getByTestId } = renderWithRedux(<Header {...props}/>)
    expect(container.firstChild).toMatchSnapshot()
    expect(getByTestId('swapButton')).toHaveProperty('hidden', true)
})

test('should call startLogout on button click', () => {
    const { getByTestId } = renderWithRedux(<Header {...props} />)
    const logoutButton = getByTestId('logoutButton')
    fireEvent.click(logoutButton)
    expect(startLogout).toHaveBeenCalled()
})

test('should show select character icon when profiles in store', () => {
    const { getByTestId } = renderWithRedux(<Header {...props} hasProfiles />)
    expect(getByTestId('swapButton')).toHaveProperty('hidden', false)
})