import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import PreparedSpells from '../../components/PreparedSpells'
import { characterOne } from '../utils/seedDatabase'
import { apiData } from '../utils/utils'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const startEditProfile = jest.fn()
let props, wrapper
beforeAll(async () => {
	const api = await apiData()
    props = {
        id: 'characterOne',
        spellbook: characterOne.spellbook,
        spells: api.spells,
        startEditProfile
    }
    wrapper = shallow(<PreparedSpells {...props} />)
})


test('should render PreparedSpells with profile data', () => {
    expect(wrapper).toMatchSnapshot()
})

// test('should trigger startEditProfile when Cast button clicked', () => {
//     const spell = props.spellbook.spells[0]
//     wrapper.find('#cast00').simulate('click', {
//         target: {
//             id: 'cast00',
//             spellid: props.spells[spell.id],
//             level: spell.level,
//             attribute: "used",
//             change: 1
//         }
//     })
//     expect(startEditProfile).toHaveBeenCalled()
// })