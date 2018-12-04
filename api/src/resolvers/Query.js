import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        
        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        
        return prisma.query.user({
            where: {
                id: userId
            }
        })
    },
    myCharacters(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                owner: {
                    id: userId
                } 
            }
        }

        if (args.query) {
            opArgs.where.OR = [{
                name_contains: args.query
            }]
        }

        return prisma.query.characters(opArgs, info)
    },
    races(parent, args, { prisma, request }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if (args.query) {
            opArgs.where = {
                name_contains: args.query
            }
        }

        return prisma.query.races(opArgs, info)
    },
    classes(parent, args, { prisma, request }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if (args.query) {
            opArgs.where = {
                name_contains: args.query
            }
        }

        return prisma.query.classes(opArgs, info)
    }
}

export { Query as default }