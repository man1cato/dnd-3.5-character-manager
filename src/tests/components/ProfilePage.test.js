import React from 'react';
import {shallow} from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {ProfilePage} from '../../components/ProfilePage';
import profile from '../fixtures/profile';


const createMockStore = configureMockStore([thunk]);
const store = createMockStore(profileData);

const profileData = {
  id: profile.id,
  ...profile.fields
};

test('should render ProfilePage', () => {
    const wrapper = shallow(<ProfilePage />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ProfilePage with profile data', () => {
    const wrapper = shallow(<ProfilePage {...profileData} />);
    expect(wrapper).toMatchSnapshot();
});
