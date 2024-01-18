import { request, gql } from 'graphql-request';
// Define the GraphQL query

const clientStub = dgraph.clientStubFromCloudEndpoint(
  "https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql",
  "MDQ4MTgxYTg4NzExZjMwYzg4MDJiNjI2MjUzZmY3Mjc="
);
const dgraphClient = new dgraph.DgraphClient(clientStub);
const query = `
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



export const getAllUsers = async (): Promise<any> => {
  const query1 = `
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
  const res = dgraphClient.newTxn().query(query1)
  const json = (await res).getJson()
  return json
}

export interface User{
    color: string;
    email: string;
    id: string;
    name: string;
    tweets: Tweet[];
}

export interface AllUsersData  {
    queryUser: {
      users: User[];
    };
  }
  
  export interface Tweet {
    id: string;
    likes: number;
    content: string;
  }
// Function to fetch data
export const fetchData = async (): Promise<any> => {
  try {
    // Execute the GraphQL query using the request function
    const data = await request("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", query);
    return data;
  } catch (error) {
    // Handle errors
    console.error('GraphQL error:', error);
    throw error;
  }
};