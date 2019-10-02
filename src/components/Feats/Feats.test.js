import React from 'react'
import {	render, fireEvent } from '@testing-library/react'

import { Feats } from './Feats'
import { apiData } from '../../tests/utils/utils'
import { characterOne } from '../../tests/utils/seedDatabase'


const featIds = characterOne.feats
let props
beforeAll(async () => {
	const api = await apiData()
	props = {
		featIds,
		feats: api.feats
	}
})


test('should render Feats with profile data', () => {
	const { container } = render(<Feats {...props} />)
	expect(container.firstChild).toMatchSnapshot()
})

test('should launch FeatModal on feat button click', async () => {
	const { getByText, queryByLabelText, findByLabelText } = render(<Feats {...props} />)
	const labelMatch = 'Selected Feat'
	
	expect(queryByLabelText(labelMatch)).toBe(null)

	const textMatch = props.feats[featIds[0]].name
	fireEvent.click(getByText(textMatch))

	const modal = await findByLabelText(labelMatch)
	expect(modal).toBeDefined()
})