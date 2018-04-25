import profileReducer from '../../reducers/profile';
import profile from '../fixtures/profile';
import update from 'react-addons-update';

const charId = profile.id;
const fields = profile.fields;
const profileData = {
  id: charId,
  ...fields
};

test('should set default state', () => {
    const state = profileReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({});
});

test('should set profile', () => {
  const action = {
    type: 'SET_PROFILE',
    id: profile.id,
    fields: profile.fields
  }
  const state = profileReducer(undefined, action);
  expect(state).toEqual(profileData);
});

test('should update an ability', () => {
  const updatedAbilities = update(profileData.abilities, {
    str: {
      tempScore: {$set: 14},
      tempMod: {$set: 1}
    },
    int: {
      tempScore: {$set: 22},
      tempMod: {$set: 5}
    }
  });
  const action = {
    type: 'EDIT_PROFILE',
    updates: {
      abilities: updatedAbilities
    }
  };
  const state = profileReducer(profileData, action);
  expect(state.abilities).toEqual(updatedAbilities);
});
