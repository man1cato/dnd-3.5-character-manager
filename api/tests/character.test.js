import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'

import prisma from '../src/prisma'
import seedDatabase, { userOne, characterOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createCharacter, getMyCharacters, updateCharacter, deleteCharacter } from './utils/operations'

// const client = getClient()

beforeEach(seedDatabase)


test('Should create character', async () => {
    const client = getClient(userOne.jwt)
    const race = await prisma.query.race({ 
        where: { name: 'Half-Elf' } 
    }, '{ id }')
    const jobClass = await prisma.query.class({
        where: { name: 'Wizard' }
    }, '{ id }')

    const variables = {
        data: {
            name: 'Alteryx',
            gender: 'Female',
            age: 125,
            height: 64,
            weight: 94,
            alignment: 'Lawful_Good',
            race: race.id,
            class: jobClass.id
        }
    }

    const { data } = await client.mutate({ mutation: createCharacter, variables })

    const characterExists = await prisma.exists.Character({
        id: data.createCharacter.id
    })

    expect(characterExists).toBe(true)
})

describe("Should update character's", () => {

    test("deity", async () => {
        const client = getClient(userOne.jwt)
    
        const variables = {
            id: characterOne.character.id,
            data: {
                deity: 'Zeus'
            }
        }    
    
        const { data } = await client.mutate({ mutation: updateCharacter, variables })
    
        expect(data.updateCharacter.deity).toBe('Zeus')
    })

    test("race", async () => {
        const client = getClient(userOne.jwt)
        const race = await prisma.query.race({ 
            where: { name: 'Orc' } 
        }, '{ id }')
    
        const variables = {
            id: characterOne.character.id,
            data: {
                race: race.id
            }
        }    
    
        const { data } = await client.mutate({ mutation: updateCharacter, variables })
    
        expect(data.updateCharacter.race.name).toBe('Orc')
    })

    test("class", async () => {
        const client = getClient(userOne.jwt)
        const jobClass = await prisma.query.class({ 
            where: { name: 'Ranger' } 
        }, '{ id }')
    
        const variables = {
            id: characterOne.character.id,
            data: {
                class: jobClass.id
            }
        }    
    
        const { data } = await client.mutate({ mutation: updateCharacter, variables })
    
        expect(data.updateCharacter.class.name).toBe('Ranger')
    })
})

test("Should delete character", async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: characterOne.character.id
    }

    await client.mutate({ mutation: deleteCharacter, variables })
    const characterExists = await prisma.exists.Character({ id: characterOne.character.id })
    
    expect(characterExists).toBe(false)
})

test("Should return user's characters",  async () => {
    const client = getClient(userOne.jwt)
    const { data } = await client.query({ query: getMyCharacters })

    expect(data.myCharacters.length).toBe(1)
})