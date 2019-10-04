import * as reducers from './api'
import fs from 'fs'


let api

beforeAll( async () => {
  api = await fs.promises.readFile('src/tests/fixtures/api.json')
	api = JSON.parse(api)
})


test('should set default state', () => {
    const state = reducers.featsReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual({})
})

test('should set feats', () => {
  const action = {
    type: 'SET_FEATS',
    feats: api.feats
  }
  const state = reducers.featsReducer(undefined, action);
  expect(state).toEqual(api.feats)
})

test('should set items', () => {
  const action = {
    type: 'SET_ITEMS',
    items: api.items
  }
  const state = reducers.itemsReducer(undefined, action);
  expect(state).toEqual(api.items)
})

test('should set jobClasses', () => {
  const action = {
    type: 'SET_JOB_CLASSES',
    jobClasses: api.jobClasses
  }
  const state = reducers.jobClassesReducer(undefined, action);
  expect(state).toEqual(api.jobClasses)
})

test('should set races', () => {
  const action = {
    type: 'SET_RACES',
    races: api.races
  }
  const state = reducers.racesReducer(undefined, action);
  expect(state).toEqual(api.races)
})

test('should set skills', () => {
  const action = {
    type: 'SET_SKILLS',
    skills: api.skills
  }
  const state = reducers.skillsReducer(undefined, action);
  expect(state).toEqual(api.skills)
})

test('should set specialAbilities', () => {
  const action = {
    type: 'SET_SPECIAL_ABILITIES',
    specialAbilities: api.specialAbilities
  }
  const state = reducers.specialAbilitiesReducer(undefined, action);
  expect(state).toEqual(api.specialAbilities)
})

test('should set spells', () => {
  const action = {
    type: 'SET_SPELLS',
    spells: api.spells
  }
  const state = reducers.spellsReducer(undefined, action);
  expect(state).toEqual(api.spells)
})