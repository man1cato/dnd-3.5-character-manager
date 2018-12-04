import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    createCharacter(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createCharacter({
            data: {
                ...data,
                race: {
                    connect: {
                        id: data.race
                    }
                },
                class: {
                    connect: {
                        id: data.class
                    }
                },
                owner: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async updateCharacter(parent, { id, data }, { prisma, request }, info) {
        const userId = getUserId(request)

        const characterExists = await prisma.exists.Character({
            id,
            owner: { id: userId }
        }) 

        if (!characterExists) {
            throw new Error('Cannot update character')
        }

        const opArgs = {
            where: { id },
            data
        }

        if (data.race) {
            opArgs.data.race = {
                connect: {
                    id: data.race
                }
            }
        }

        if (data.class) {
            opArgs.data.class = {
                connect: {
                    id: data.class
                }
            }
        }
        
        return prisma.mutation.updateCharacter(opArgs, info)
    },
    async deleteCharacter(parent, { id }, { prisma, request }, info) {
        const userId = getUserId(request)
        const characterExists = await prisma.exists.Character({
            id,
            owner: { id: userId }
        }) 

        if (!characterExists) {
            throw new Error('Cannot delete character')
        }

        return prisma.mutation.deleteCharacter({ where: { id } }, info)
    }
}

export { Mutation as default }