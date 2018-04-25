import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../../components/footer';

test('should render footer correctly', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});
