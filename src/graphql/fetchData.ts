import { request, gql } from 'graphql-request';
// Define the GraphQL query

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




export async function AddNewTweet(userid: string, content:string) : Promise<boolean>{


  const requestBody = {
    query: `mutation updateUser($patch: UpdateUserInput!) {
      updateUser(input: $patch) {
        user {
          id
          name
          email
          color
          tweets {
            id
            content
            likes
          }
        }
      }
    }`,
    variables: {
      patch: {
        filter: {
          id: [userid]
        },
        set: {
          tweets: {
            content: content,
            likes: 0
          }
        }
      }
    }
  };
 
   const request = await fetch("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  return true
}


export async function DeleteTweet(user:string,tweet: string): Promise<boolean>{
  const removeNode = {
    query: `
      mutation MyMutation($userId: [ID!], $tweetId: ID!) {
        updateUser(input: {filter: {id: $userId}, remove: {tweets: {id: $tweetId}}}) {
          numUids
        }
      }
    `,
    variables: {
      userId: user, 
      tweetId: tweet 
    }
  };
  
  const requestBody = {
    query: `mutation deleteTweet($filter: TweetFilter!) {
      deleteTweet(filter: $filter) {
        msg
         tweet{
          id
          content
          likes
        }
      }
    }`,
    variables: {
      patch: {
        filter: {
          id: [tweet]
        }
      }
    }
  };
  const requestNodeChild = await fetch("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(removeNode),
  })

  const request = await fetch("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  return true
}