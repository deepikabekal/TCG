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
    title
    description
    price
    medium
    dimensions
    price
    image
  }
}
`;