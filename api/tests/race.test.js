import 'cross-fetch/polyfill'

import prisma from '../src/prisma'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getRaces } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)


test('Should expose public races', async () => {
    const { data } = await client.query({ query: getRaces })

    expect(data.races.length).toBe(3)
})