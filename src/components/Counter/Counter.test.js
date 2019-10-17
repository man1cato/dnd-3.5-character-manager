import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Counter from './Counter'


const updateValue = jest.fn()
let props

beforeAll(() => {
   props = {
      value: 0,
      updateValue
   }
})


test('should render Counter with input field', () => {
   const { container } = render(<Counter {...props} />)
   expect(container.firstChild).toMatchSnapshot()
})

test('should render Counter without input field', () => {
   const { container } = render(<Counter {...props} noInput />)
   expect(container.firstChild).toMatchSnapshot()
})

test('should trigger updateValue on button push', () => {
   const { getAllByRole } = render(<Counter {...props} />)
   const buttons = getAllByRole('button')
   
   fireEvent.click(buttons[0])
   expect(updateValue).toHaveBeenCalledWith(-1)

   fireEvent.click(buttons[1])
   expect(updateValue).toHaveBeenCalledWith(1)
})