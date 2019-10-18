import React from 'react'
import { render, fireEvent, getNodeText } from '@testing-library/react'

import Saves from './Saves'


const handleUpdate = jest.fn()
let props

beforeEach(() => {
	props = {
		saveBases: { fortitude: 1, reflex: 4, will: 1 },
		handleUpdate
	}
})

test('should render saves with profile data', () => {
	const { container } = render(<Saves {...props} />)
	expect(container.firstChild).toMatchSnapshot()
})

test('should update total value when mod field changes', () => {
	const { getByTestId } = render(<Saves {...props} />)
	
	const value = 3
	const fortitudeModNode = getByTestId('fortitudeMod')
	fireEvent.change(fortitudeModNode, { target: { value } })
	expect(fortitudeModNode.value).toBe(`${value}`)

	const fortitudeTotalNode = getByTestId('fortitudeTotal')
	expect(getNodeText(fortitudeTotalNode)).toBe(`${props.saveBases.fortitude + value}`)
})