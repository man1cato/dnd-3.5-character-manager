import 'cross-fetch/polyfill'

import prisma from '../src/prisma'
import seedDatabase, { userOne, characterOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createCharacter } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)


describe('When creating a character', () => {
    const variables = {
        data: {
            name: 'Alteryx',
            gender: 'Female',
            age: 125,
            height: `5'4"`,
            alignment: 'Lawful_Good',
            deity: ''
        }
    }

    test('should pass if authenticated', async () => {
        const client = getClient(userOne.jwt)
    
        const { data } = await client.mutate({ mutation: createCharacter, variables })
        console.log(data)
        const characterExists = await prisma.exists.Character({
            id: data.createCharacter.id
        })

        expect(characterExists).toBe(true)
    })
    
    test('should fail if not authenticated', async () => {    
        await expect(
            client.mutate({ mutation: createCharacter, variables })
        ).rejects.toThrow()
    })
})


// test("Should return user's characters",  async () => {

// })

