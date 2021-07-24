const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
}

type Auth {
    token: ID!
    user: User
}

type Art {
    _id: ID
    title: String
    description: String
    medium: String
    price: String
    dimensions: String
    image: String
    username: String
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    arts: [Art]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
}
`

module.exports = typeDefs;