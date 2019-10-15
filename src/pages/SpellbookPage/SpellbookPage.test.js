import React from 'react'
import { mount } from 'enzyme'
import { render, fireEvent } from '@testing-library/react'

import { SpellbookPage } from './SpellbookPage'
import { characterOne } from '../../tests/seedDatabase'
import { apiData } from '../../tests/utils'


const startEditProfile = jest.fn()
let props, spellbook
beforeAll(async () => {
	const api = await apiData()
    props = {
        profile: characterOne,
        jobClasses: api.jobClasses,
        spells: api.spells,
        startEditProfile
    }
})
beforeEach(() => {
    spellbook = props.profile.spellbook
})


test('should render SpellbookPage with profile data', () => {
    const { container } = render(<SpellbookPage {...props} />)
    expect(container.firstChild).toMatchSnapshot()
})

test('should launch SpellModal on spell button click', async () => {
    const { getByText, queryByLabelText, findByLabelText } = render(<SpellbookPage {...props} />)
    const labelMatch = 'Selected Spell'

    expect(queryByLabelText(labelMatch)).toBe(null)

    const textMatch = props.spells[spellbook[0][0].id].name
    fireEvent.click(getByText(textMatch))

    const modal = await findByLabelText(labelMatch)
    expect(modal).toBeDefined()
})