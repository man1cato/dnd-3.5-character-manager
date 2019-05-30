import React from 'react'
import {shallow} from 'enzyme'

import { SkillSet } from '../../components/SkillSet'
import profile from '../fixtures/profile'
import { getSkills } from '../../utils/getFirebaseData'


test('should render SkillSet with profile data', async () => {
	const props = {
		skillSet: profile.fields.skillSet,
		skills: await getSkills()
	}
	const wrapper = shallow(<SkillSet {...props} />)
	expect(wrapper).toMatchSnapshot()
})
