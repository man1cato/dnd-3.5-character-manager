import React from 'react'
import { render } from '@testing-library/react'

import LoadingPage from './LoadingPage'


test('should render loading page correctly', () => {
    const { container } = render(<LoadingPage />)
    expect(container.firstChild).toMatchSnapshot()
})