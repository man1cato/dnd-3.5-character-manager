import React from 'react'
import { shallow } from 'enzyme'

import { Weapons } from '../../components/Weapons'
import profile from '../fixtures/profile'
import items from '../fixtures/items'

const props = { 
    weaponSet: profile.fields.weaponSet,
    weapons: items.filter((item) => item.category === "Weapon")
}


test('should render weapons with profile data', () => {
    const wrapper = shallow(<Weapons {...props} />)
    expect(wrapper).toMatchSnapshot()
})
