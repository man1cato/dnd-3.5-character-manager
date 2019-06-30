import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { mount } from 'enzyme'
import _ from 'lodash'

import PreparedSpells from '../../components/PreparedSpells'
import { characterOne } from '../utils/seedDatabase'
import { apiData } from '../utils/utils'


const handleUpdate = jest.fn()
const spellbook = characterOne.spellbook
let props
beforeAll(async () => {
	const api = await apiData()
    props = {
        id: 'characterOne',
        spellbook,
        spells: api.spells,
        handleUpdate
    }
})


test('should render PreparedSpells with profile data', () => {
    const { container } = render(<PreparedSpells {...props} />)
    expect(container.firstChild).toMatchSnapshot()
})

test('should launch SpellModal on feat button click', async () => {
    const { getByText, queryByLabelText, findByLabelText } = render(<PreparedSpells {...props} />)
    const labelMatch = 'Selected Spell'

    expect(queryByLabelText(labelMatch)).toBe(null)

    const textMatch = props.spells[spellbook[0].spells[0].id].name
    fireEvent.click(getByText(textMatch))

    const modal = await findByLabelText(labelMatch)
    expect(modal).toBeDefined()
})

test('should reduce remaining value for spell when Cast button clicked', () => {
    const wrapper = mount(<PreparedSpells {...props} />)
    const { id, remaining } = characterOne.spellbook[0].spells[0]

    expect(wrapper.find(`#${id}Remaining`).text()).toEqual(`${remaining}`)
    expect(wrapper.find(`#${id}UndoButton`)).toHaveLength(0)

    wrapper.find(`#${id}CastButton`).simulate('click')

    expect(wrapper.find(`#${id}Remaining`).text()).toEqual(`${remaining - 1}`)
    expect(wrapper.find(`#${id}UndoButton`)).toHaveLength(1)
})