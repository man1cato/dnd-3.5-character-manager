import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import CreatorFormPage3 from '../../components/CreatorFormPage3'
import { abilities } from '../../utils/staticData'


let wrapper, props
beforeEach(() => {
   props = {
      values: { abilities: _.mapValues(abilities, () => ({ score: '' })) }
   }
   wrapper = shallow(<CreatorFormPage3 {...props} />)
})


test('should render CreatorFormPage3 correctly', () => {
	expect(wrapper).toMatchSnapshot()
})