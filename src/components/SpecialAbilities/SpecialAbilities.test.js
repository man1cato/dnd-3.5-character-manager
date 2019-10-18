import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { SpecialAbilities } from './SpecialAbilities'
import profile from '../../test-utils/fixtures/profile'
import { apiData } from '../../test-utils/utils'


let props
beforeAll(async () => {
	const api = await apiData()
	const specialAbilities = api.specialAbilities
  props = {
    specialAbilityIds: profile.specialAbilities,
    specialAbilities
  }
})

test('should render special abilities with profile data', () => {
  const { container } = render(<SpecialAbilities {...props} />)
  expect(container.firstChild).toMatchSnapshot()
})

test('should render SpecialAbilityModal when special ability clicked', async () => {
  const { getByTestId, findByLabelText } = render(<SpecialAbilities {...props} />)
  fireEvent.click(getByTestId(props.specialAbilityIds[0]))

  const modal = await findByLabelText("Selected Special Ability")
  expect(modal).toBeDefined()
})