import { gql } from 'apollo-boost'

const createUser = gql`
    mutation($data:CreateUserInput!) {
        createUser(
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

const getUsers = gql`
    query {
        users {
            id
            name
            email
        }
    }
`

const login = gql`
    mutation($data:LoginUserInput!) {
        login(
            data: $data
        ){
            token
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
    mutation($data:CreateCharacterInput!) {
        createCharacter(
            data: $data
        ){
            id
            name
            gender
            age
            height
            weight
            alignment
            deity
            race {
                id
                name
            }
            class {
                id
                name
            }
        }
    }
`

const updateCharacter = gql`
    mutation($id: ID!, $data: UpdateCharacterInput!) {
        updateCharacter (id: $id, data: $data) {
            id
            name
            gender
            age
            height
            weight
            alignment
            deity
            race {
                id
                name
            }
            class {
                id
                name
            }
        }
    }
`

const deleteCharacter = gql`
    mutation($id: ID!) {
        deleteCharacter(id: $id) {
            id
            name
        }
    }
`

const getMyCharacters = gql`
    query {
        myCharacters{
            id
            name
            gender
            age
        }
    }
`

const getRaces = gql`
    query {
        races {
            id
            name
        }
    }
`

const getClasses = gql`
    query {
        classes {
            id
            name
        }
    }
`

export { 
    createUser, 
    login, 
    getUsers, 
    getProfile, 
    createCharacter, 
    updateCharacter,
    deleteCharacter,
    getMyCharacters,
    getRaces,
    getClasses
}