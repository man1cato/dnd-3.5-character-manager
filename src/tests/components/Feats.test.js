import React from 'react'
import {shallow} from 'enzyme'

import { Feats } from '../../components/Feats'
import profile from '../fixtures/profile'
import { getFeats } from '../../utils/getFirebaseData'


let props, wrapper

beforeAll(async () => {
	props = {
		featIds: profile.fields.feats,
		feats: await getFeats()
	}
	wrapper = shallow(<Feats {...props} />)
})


test('should render Feats with profile data', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should update state.selected on feat button click', () => {
	const id = props.featIds[0] 
	wrapper.find(`#${id}`).simulate('click', {
		target: { id }
	})
	expect(wrapper.state('selected')).toBe(props.feats[id])
})