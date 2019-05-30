import React from 'react'
import { shallow } from 'enzyme'

import { Weapons } from '../../components/Weapons'
import profile from '../fixtures/profile'
import { getItems } from '../../utils/getFirebaseData'
import {apiObjectToArray} from '../../utils/utils'

test('should render weapons with profile data', async () => {
    const items = await getItems()
    const props = { 
        weaponSet: profile.fields.weaponSet,
        weapons: apiObjectToArray(items).filter((item) => item.category === "Weapon")
    }
    const wrapper = shallow(<Weapons {...props} />)
    expect(wrapper).toMatchSnapshot()
})
