import React from 'react'
import { shallow } from 'enzyme'

import { SpellbookPage } from '../../components/SpellbookPage'
import { characterOne } from '../utils/seedDatabase'
import { apiData } from '../utils/utils'


let props, wrapper
beforeAll(async () => {
	const api = await apiData()
    props = {
        id: 'characterOne',
        spellbook: characterOne.spellbook,
        spells: api.spells
    }
    wrapper = shallow(<SpellbookPage {...props} />)
})

test('should render SpellbookPage with profile data', () => {
    expect(wrapper).toMatchSnapshot()
})