import React from 'react';
import { shallow } from 'enzyme';

import { CharacterSelectionPage } from '../../components/CharacterSelectionPage';
import profiles from '../fixtures/profiles'


const startSetProfile = jest.fn()
const uid = 'abc123'
let wrapper

beforeEach(() => {
	wrapper = shallow(
		<CharacterSelectionPage 
			uid={uid}
			profiles={profiles} 
			startSetProfile={startSetProfile}
		/>
	)
})


test('should render CharacterSelectionPage with profiles data', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should disable buttons and call startSetProfile', () => {
	const id = profiles[0].id 
	wrapper.find(`#${id}`).simulate('click', {
		currentTarget: { id }
	})
    
	expect(wrapper.state('disabled')).toBe(true)
	expect(wrapper.find('button').at(1).props().disabled).toBe(true)
	expect(startSetProfile).toHaveBeenCalledWith(uid, id)
})