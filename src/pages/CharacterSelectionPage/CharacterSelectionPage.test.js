import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { CharacterSelectionPage } from './CharacterSelectionPage'
import profiles from '../../test-utils/fixtures/profiles'
import { apiData } from '../../test-utils/utils'


const profile = profiles[0]
const startSetProfile = jest.fn()
let props

beforeAll(async () => {
	const api = await apiData()
	props = {
		uid: 'abc123',
		profiles,
		startSetProfile,
		jobClasses: api.jobClasses,
		races: api.races
	}
})


test('should render CharacterSelectionPage with profiles data', () => {
	const { container } = render(<CharacterSelectionPage {...props} />)
	expect(container.firstChild).toMatchSnapshot()
})

test('should display ConfirmationModal when remove button clicked', async () => {
	const { getByTestId, findByLabelText } = render(<CharacterSelectionPage {...props} />)
	const removeButton = getByTestId(profile.id + 'RemoveButton')
	fireEvent.click(removeButton)
	const modal = await findByLabelText('Confirm Decision')
	expect(modal).not.toBeNull()
})