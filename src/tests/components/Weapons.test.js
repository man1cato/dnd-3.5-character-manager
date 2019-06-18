import React from 'react'
import { shallow } from 'enzyme'
import fs from 'fs'

import { Weapons } from '../../components/Weapons'
import profile from '../fixtures/profile'
import {apiObjectToArray} from '../../utils/utils'

let props
beforeAll(async () => {
   const api = await fs.promises.readFile('src/tests/fixtures/api.json')
   const items = JSON.parse(api).items

   props = { 
       weaponSet: profile.weaponSet,
       weapons: apiObjectToArray(items).filter((item) => item.category === "Weapon")
   }
})

test('should render weapons with profile data', async () => {
    const wrapper = shallow(<Weapons {...props} />)
    expect(wrapper).toMatchSnapshot()
})
