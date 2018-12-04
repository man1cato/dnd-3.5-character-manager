import 'cross-fetch/polyfill'

import prisma from '../src/prisma'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getClasses } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)


test('Should expose public races', async () => {
    const { data } = await client.query({ query: getClasses })

    expect(data.classes.length).toBe(4)
})