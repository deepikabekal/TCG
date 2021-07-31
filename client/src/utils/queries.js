import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       arts {
//         _id
//         thoughtText
//         createdAt
//         reactionCount
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  {
    me {
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
        vote{
          _id
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_ARTS = gql`
  {
    arts {
      _id
      title
      artist
      description
      medium
      price
      dimensions
      image
      vote {
        _id
      }
    }
  }
`;