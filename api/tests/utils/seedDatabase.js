import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: 'Jen',
        email: 'jen@example.com',
        password: bcrypt.hashSync('blue98765')
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'Jeff',
        email: 'jeff@example.com',
        password: bcrypt.hashSync('PassForJeff')
    },
    user: undefined,
    jwt: undefined
}

const characterOne = {
    input: {
        name: 'Krog',
        gender: 'Male',
        age: 67,
        height: 79,
        weight: 246,
        alignment: 'Neutral_Evil',
        deity: 'Mephisto'
    }, 
    character: undefined
}

// const raceOne = {
//     name: "Half-Elf",
//     size: 'Medium',
//     speed: 30,
//     defaultLanguages: {
//         set: ['Common', 'Elven']
//     },
//     bonusLanguages: {
//         set: ['Draconic', 'Dwarven', 'Giant', 'Gnoll', 'Gnome', 'Goblin', 'Orc', 'Halfling', 'Sylvan', 'Undercommon', 'Terran', 'Abyssal']
//     },
//     racialBonuses: {
//         set: [
//             "+1 on Listen, Search, and Spot checks.",
//             "+2 on Diplomacy and Gather Information checks.",
//             "Elven Blood: For all effects related to race, a half-elf is considered an elf."
//         ]
//     }
// }

// const raceTwo = {
//     name: "Gray Elf",
//     bonusLanguages: ['Draconic', 'Gnoll', 'Gnome', 'Goblin', 'Orc', 'Sylvan'],
//     size: 'Medium',
//     defaultLanguages: ["Common", "Elven"],
//     abilityMods: {
//         dex: 2,
//         con: -2,
//         str: -2,
//         int: 2,
//     },
//     speed: 30
// }

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyCharacters()
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    // Create user two
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

    //Create character one
    characterOne.character = await prisma.mutation.createCharacter({
        data: {
            ...characterOne.input,
            // race: {
            //     connect: {
            //         name: 'Half-Elf'
            //     }
            // },
            owner: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })
}

export { seedDatabase as default, userOne, userTwo, characterOne }