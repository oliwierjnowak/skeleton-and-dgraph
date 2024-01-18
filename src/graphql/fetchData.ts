import { request, gql } from 'graphql-request';

// Define the GraphQL query
const query = gql`
query allUsers {
     queryUser {
        color
        email
        id
        name
        tweets {
            id
            likes
            content
        }
      }
}`;


export interface AllUsersData  {
    queryUser: {
      color: string;
      email: string;
      id: string;
      name: string;
      tweets: Tweet[];
    };
  }
  
  export interface Tweet {
    id: string;
    likes: number;
    content: string;
  }
// Function to fetch data
export const fetchData = async (): Promise<random> => {
  try {
    // Execute the GraphQL query using the request function
    const data = await request<random>("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", query);
    return data;
  } catch (error) {
    // Handle errors
    console.error('GraphQL error:', error);
    throw error;
  }
};

export type random = {
  queryUser: user[]
}
export type user = {
  color : string,
  email : string,
  id: string,
  name: string,
  tweets : tweet []
}
export type tweet = {
  id : string,
  likes: number,
  content: string
}