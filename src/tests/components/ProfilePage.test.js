import React from 'react';
import { shallow } from 'enzyme';

import { ProfilePage } from '../../components/ProfilePage';
import profile from '../fixtures/profile';

const profileData = {
	id: profile.id,
	...profile.fields
}


test('should render ProfilePage with profile data', () => {
	const wrapper = shallow(<ProfilePage {...profileData} />)
	expect(wrapper).toMatchSnapshot()
})
