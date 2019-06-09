import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import fs from 'fs'

import profile from '../fixtures/profile'
import AppRouter from '../../routers/AppRouter'
import LoginPage from '../../components/LoginPage'
import ProfilePage from '../../components/ProfilePage'
import CharacterCreationPage from '../../components/CharacterCreationPage'
import CharacterSelectionPage from '../../components/CharacterSelectionPage'
import NotFoundPage from '../../components/NotFoundPage'

const mockStore = configureStore()

const createWrapper = (initialEntries, state) => mount(
   <MemoryRouter
      initialEntries={initialEntries}
   >
      <Provider store={mockStore(state)}>
         <AppRouter />
      </Provider>
   </MemoryRouter>   
)

const storeProfile = { id: profile.id, ...profile.fields }

let api, wrapper, state

beforeAll(async () => {
   api = await fs.promises.readFile('src/tests/fixtures/api.json')
	api = JSON.parse(api)
})


describe('authenticated user', () => {
   beforeEach(() => {
      state = {
         auth: { uid: 'abc123'},
         profiles: [],
         ...api
      }
   })

   test('should be directed to /create if no profile exists', () => {
      wrapper = createWrapper(['/'], state)
      expect(wrapper.find(CharacterCreationPage)).toHaveLength(1)
   })

   test('should be directed to /profile if one profile exists', () => {
      state.profile = storeProfile
      wrapper = createWrapper(['/'], state)
      expect(wrapper.find(CharacterCreationPage)).toHaveLength(0)
      expect(wrapper.find(ProfilePage)).toHaveLength(1)
   })
   
   test('should be directed to /select if multiple profiles exist', () => {

   })

   test('should be directed to 404 upon invalid path', () => {
      wrapper = createWrapper(['/wrongpath'], state)
      expect(wrapper.find(CharacterCreationPage)).toHaveLength(0)
      expect(wrapper.find(NotFoundPage)).toHaveLength(1)
   })
})