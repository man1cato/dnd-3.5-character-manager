import bcrypt from 'bcryptjs'

import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'


const Mutation = {
    async loginUser(parent, { data }, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: data.email
            }
        })
        
        if (!user) {
            throw new Error('Email not found')
        }

        const hashedPassword = user.password

        const isMatch = await bcrypt.compare(data.password, hashedPassword)
        
        if (!isMatch) {
            throw new Error('Password is incorrect')
        }

        return {
            user,
            token: generateToken(user.id) 
        }
    },
    async createUser(parent, { data }, { prisma }, info) {
        const password = await hashPassword(data.password)

        const user = await prisma.mutation.createUser({ 
            data: {
                ...data,
                password
            } 
        })

        return {
            user,
            token: generateToken(user.id)
        }
    },
    deleteUser(parent, args, { prisma, request }, info) { 
        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
            where: { id: userId }
        }, info)
    },
    async updateUser(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)

        if (typeof data.password === 'string') {
            data.password = await hashPassword(data.password)
        }

        return prisma.mutation.updateUser({
            where: { id: userId },
            data
        }, info)
    },
    createCharacter(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createCharacter({
            data: {
                ...data,
                owner: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    }
}

export default Mutation