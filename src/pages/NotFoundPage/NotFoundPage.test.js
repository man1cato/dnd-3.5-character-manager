import React from 'react'

import NotFoundPage from './NotFoundPage'
import { renderWithRouter } from '../../test-utils/utils'


test('should render NotFoundPage correctly', () => {
    const { container } = renderWithRouter(<NotFoundPage />)
    expect(container).toMatchSnapshot();
})