import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Footer } from './Footer'
import profile from '../../tests/fixtures/profile'
import { renderWithRedux } from '../../tests/utils'


test('should render footer correctly', () => {
  const { container } = renderWithRedux(<Footer profile={profile} />)
  expect(container.firstChild).toMatchSnapshot()
})