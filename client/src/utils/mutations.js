import { gql } from '@apollo/client';

// mution for login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// mutation for signup
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// mutation add artwork
export const ADD_ART = gql`
mutation addArt($title: String!, $description: String, $medium: String, $price: Int!, $dimensions: String!, $image: String!){
  addArt(title: $title, description: $description, medium: $medium, price: $price, dimensions: $dimensions, image: $image) {
    _id
    title
    artist
    description
    price
    medium
    dimensions
    image
  }
}
`;

export const REMOVE_ART = gql`
    mutation removeBook($artId: String!){
        removeBook(artId: $bookId){
              _id
              username
              email
              arts {
                _id
                title
                description
                medium
                price
                dimensions
                image
                artist
              }
            }
          }
`;

