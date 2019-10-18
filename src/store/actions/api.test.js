import * as actions from './api'
import { apiData } from '../../test-utils/utils'


let api

beforeAll(async () => {
  api = await apiData()
})


test('should setup set feats action object', () => {
  const action = actions.setFeats(api.feats)
  expect(action).toEqual({
    type: 'SET_FEATS',
    feats: api.feats
  })
})

test('should setup set items action object', () => {
  const action = actions.setItems(api.items)
  expect(action).toEqual({
    type: 'SET_ITEMS',
    items: api.items
  })
})

test('should setup set jobClasses action object', () => {
  const action = actions.setJobClasses(api.jobClasses)
  expect(action).toEqual({
    type: 'SET_JOB_CLASSES',
    jobClasses: api.jobClasses
  })
})

test('should setup set races action object', () => {
  const action = actions.setRaces(api.races)
  expect(action).toEqual({
    type: 'SET_RACES',
    races: api.races
  })
})

test('should setup set skills action object', () => {
  const action = actions.setSkills(api.skills)
  expect(action).toEqual({
    type: 'SET_SKILLS',
    skills: api.skills
  })
})

test('should setup set specialAbilities action object', () => {
  const action = actions.setSpecialAbilities(api.specialAbilities)
  expect(action).toEqual({
    type: 'SET_SPECIAL_ABILITIES',
    specialAbilities: api.specialAbilities
  })
})

test('should setup set spells action object', () => {
  const action = actions.setSpells(api.spells)
  expect(action).toEqual({
    type: 'SET_SPELLS',
    spells: api.spells
  })
})