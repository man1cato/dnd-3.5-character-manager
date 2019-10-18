import React from 'react'
import { render, fireEvent, getNodeText } from '@testing-library/react'
import _ from 'lodash'

import PreparedSpells from './PreparedSpells'
import { characterOne } from '../../test-utils/seedDatabase'
import { apiData } from '../../test-utils/utils'


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

test('should launch SpellModal on spell button click', async () => {
    const { getByText, queryByLabelText, findByLabelText } = render(<PreparedSpells {...props} />)
    const labelMatch = 'Selected Spell'

    expect(queryByLabelText(labelMatch)).toBe(null)

    const textMatch = props.spells[spellbook[0][0].id].name
    fireEvent.click(getByText(textMatch))

    const modal = await findByLabelText(labelMatch)
    expect(modal).toBeDefined()
})

test('should reduce remaining value for spell when Cast button clicked', () => {
    const { getByTestId, queryByTestId } = render(<PreparedSpells {...props} />)

    const { id, remaining } = characterOne.spellbook[0][0]
    const remainingNode = getByTestId(`${id}Remaining`)

    expect(getNodeText(remainingNode)).toBe(`${remaining}`)
    expect(queryByTestId(`${id}UndoButton`)).toBeNull()

    fireEvent.click(getByTestId(`${id}CastButton`))

    expect(getNodeText(remainingNode)).toBe(`${remaining - 1}`)
    expect(queryByTestId(`${id}UndoButton`)).not.toBeNull()
})