import React from 'react'
import {shallow} from 'enzyme'
import fs from 'fs'

import { Feats } from '../../components/Feats'
import profile from '../fixtures/profile'


let props, wrapper
beforeAll(async () => {
	const api = await fs.promises.readFile('src/tests/fixtures/api.json')
	const feats = JSON.parse(api).feats
	props = {
		featIds: profile.fields.feats,
		feats
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