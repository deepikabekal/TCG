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
    description: String
    medium: String
    image: String
    username: String
    title: String!
    price: Int!
    dimensions : String!
    image: String!
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    arts: [Art]
    art(title: String!): Art
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addArt(title: String!, description: String, medium: String, price: Int!, dimensions: String!, image: String!) : Art
}
`

module.exports = typeDefs;