import jwt from 'jsonwebtoken'

export default (request, requireAuth = true) => {
    const header = request.request ? 
        request.request.headers.authorization   //for normal authentication
        :
        request.connection.context.Authorization    //for subscription authentication

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)  //if verification fails, error is thrown
    
        return decoded.userId
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    }

    return null
}