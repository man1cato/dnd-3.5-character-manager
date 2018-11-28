import { gql } from 'apollo-boost'

const createUser = gql`
    mutation ($data: CreateUserInput!){
        createUser (
            data: $data
        ){
            token,
            user {
                id
                name
                email
            }
        }
    }
`

const loginUser = gql`
    mutation ($data: LoginUserInput!) {
        loginUser (
            data: $data
        ){
            token
        }
    }
`

const getUsers = gql`
    query {
        users {
            id
            name 
            email
        }
    }
`

const getProfile = gql`
    query {
        me {
            id
            name
            email
        }
    }
`

const createCharacter = gql`
    mutation ($data: CreateCharacterInput!){
        createCharacter (
            data: $data
        ) {
            id
            name
            gender
            age
            height
            alignment
            deity
        }
    }
`


export {
    createUser,
    loginUser,
    getUsers,
    getProfile,
    createCharacter
}