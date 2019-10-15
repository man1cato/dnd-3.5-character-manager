import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'

import { CharacterSelectionPage } from './CharacterSelectionPage'
import profiles from '../../tests/fixtures/profiles'
import { apiData, renderWithRouter } from '../../tests/utils'


const profileId = profiles[0].id
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

test('should redirect to /profile when profile clicked', async () => {
	// const { getByTestId, history } = renderWithRouter(<CharacterSelectionPage {...props} />, {
	// 	route: '/select'
	// })
	// expect(history.location.pathname).toBe('/select')

	// const profileButton = getByTestId(profileId)
	// fireEvent.click(profileButton)

	// await wait()
	// expect(history.location.pathname).toBe('/profile')
})

test('should display ConfirmationModal when remove button clicked', async () => {
	const { getByTestId, findByLabelText } = render(<CharacterSelectionPage {...props} />)
	
	const removeButton = getByTestId(profileId + 'RemoveButton')
	fireEvent.click(removeButton)
	const modal = await findByLabelText('Confirm Decision')
	expect(modal).not.toBeNull()
})