import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { SkillSet } from '../../components/SkillSet'
import { apiData } from '../utils/utils'
import { characterOne } from '../utils/seedDatabase'


const skillSet = characterOne.skillSet
let props
beforeAll(async () => {
	const api = await apiData()
	props = {
		skillSet,
		skills: api.skills
	}
})


test('should render SkillSet with profile data', () => {
	const { container } = render(<SkillSet {...props} />)
	expect(container.firstChild).toMatchSnapshot()
})

test('should update selected in state on skill button click', async () => {
	const { getByText, queryByLabelText, findByLabelText } = render(<SkillSet {...props} />)
	const labelMatch = 'Selected Skill'
	
	expect(queryByLabelText(labelMatch)).toBe(null)

	const textMatch = props.skills[skillSet[0].id].name
	fireEvent.click(getByText(textMatch))

	const modal = await findByLabelText(labelMatch)
	expect(modal).toBeDefined()
})