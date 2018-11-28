import getUserId from "../utils/getUserId";

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
                name_contains: args.query
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
        }, info)
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
    }
}

export default Query