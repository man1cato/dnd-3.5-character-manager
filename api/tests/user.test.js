import 'cross-fetch/polyfill'

import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getUsers, getProfile, loginUser } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)


test('Should create a new user', async () => {
    const variables = {
        data: {
            name: 'Andres',
            email: 'andres@example.com',
            password: 'red12345'
        }
    }
    const response = await client.mutate({ mutation: createUser, variables })
    const userExists = await prisma.exists.User({
        id: response.data.createUser.user.id
    }) 

    expect(userExists).toBe(true)
}) 

test('Should expose public author profiles', async () => {
    const response = await client.query({ query: getUsers })

    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Jen')
})

test('Should login and provide authentication token', async () => {
    const variables = {
        data: {
            email: "jen@example.com",
            password: "blue98765"
        }
    }

    const { data } = await client.mutate({ mutation: loginUser, variables })

    expect(data.loginUser).toHaveProperty('token')
})

test('Should not login with bad credentials', async () => {
    const variables = {
        data: {
            email: "jen@example.com",
            password: "51dhn5gfch1f"
        }
    }

    await expect(
        client.mutate({ mutation: loginUser, variables })      //this is a Promise
    ).rejects.toThrow()                         //so it requires the use of "rejects"
})

test('Should not signup user with invalid password', async () => {
    const variables = {
        data: {
            name: 'Jeff',
            email: 'jeff@example.com',
            password: 'green23'
        }
    }

    await expect(
        client.mutate({ mutation: createUser, variables })
    ).rejects.toThrow()
})

test('Should not signup a user with an email that is already in use', async () => {
    const variables = {
        data: {
            name: 'Jenny',
            email: 'jen@example.com',
            password: 'aeifji3f9jm'
        }
    }

    await expect(
        client.mutate({ mutation: createUser, variables })
    ).rejects.toThrow()
})

test('Should fetch user profile', async () => {
    const client = getClient(userOne.jwt)
    const { data } = await client.query({ query: getProfile })

    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
})