import { request, gql } from 'graphql-request';
// Define the GraphQL query

const query = `
query MyQuery {
  queryTweet(filter: {not: {has: owner}}) {
    id
    likes
    content
    creator {
      name
      id
      email
      color
    }
  }
}
`;

const topicQuery = `
query MyQuery {
  queryUser {
    id
    name
    email
    color
  }
}
`;

export type FrontPageState = {
  queryTweet: tweet[]
}
export type tweet = {
  likes : number,
  content: string,
  id: string,
  comments: string,
  creator : [user] 
}
export type user = {
  id : string,
  color: string,
  email: string,
  name: string
}

export const fetchData = async (): Promise<FrontPageState> => {
  try {
    // Execute the GraphQL query using the request function
    const data = await request<FrontPageState>("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", query);
    return data;
  } catch (error) {
    // Handle errors
    console.error('GraphQL error:', error);
    throw error;
  }
};
type UserState= {
  queryUser: user[]
}
export const fetchTopicData = async (): Promise<user[]> => {
  try {
    // Execute the GraphQL query using the request function
    const data = await request<UserState>("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", topicQuery);
    return data.queryUser;
  } catch (error) {
    // Handle errors
    console.error('GraphQL error:', error);
    throw error;
  }
};

 export  const loadOwner = async  (id: string): Promise<ownerTweet>  =>  {

	var query = `query MyQuery {
					getTweet(id: "${id}") {
						likes
						id
						content
						creator {
						id
						name
						color
						email
						}
						childtweets {
						id
						likes
						content
						childtweetsAggregate {
							count
							}	
						}
						childtweetsAggregate {
						count
						}
					}
					}
					`
	const data = await request<specificTweet>("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", query);
	//console.log(data.getTweet.childtweets[0].childtweetsAggregate.count)
  console.log(data.getTweet)
	return data.getTweet;
}
export type specificTweet = {
	getTweet: ownerTweet
}
export type ownerTweet = {
	likes : number,
	content: string,
	id: string,
	name: string,
	creator : [user] 
	childtweetsAggregate? : {count?:number}
	childtweets : [{content:string,id:string,likes:number,childtweetsAggregate? : {count?:number}}]
}
export async function AddNewTweet(childTweet : boolean,userid: string, content:string, topic : string | undefined) : Promise<boolean>{


    const requestBody = {
      query: `mutation MyMutation($content: String, $id: ID ) {
                addTweet(input: {content: $content, creator: {id: $id}, likes: 0}){
                tweet {
                  content
                  creator {
                    id
                  }
                  id
                }
                
                }
              }`,
      variables: {
        content: content,
        id: userid
      }
    };

    const childTweetRequest = {
      query: `mutation MyMutation($creator2: ID , $creator1: [ID!] , $topic: ID , $content: String ) {
                updateTweet(input: {filter: {id: $creator1}, set: {childtweets: {content: $content, owner: {id: $creator2}, likes: 0, creator: {id: $topic}}}}) {
                  numUids
                }
              }
              `,
      variables: {
        content: content,
        topic: topic ?? "",
        creator1: userid,
        creator2 : userid
      }
    };

    const request = await fetch("https://nameless-brook-560043.eu-central-1.aws.cloud.dgraph.io/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(childTweet ? childTweetRequest : requestBody),
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
    query: `mutation MyMutation($id: [ID!]) {
      deleteTweet(filter: {id: $id}) {
        msg
        numUids
        tweet {
          id
          likes
          content
        }
      }
    }`,
    variables: {
      id: tweet
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

/*


mutation MyMutation {
  updateTweet(input: {
		filter: {
			id: "0x1a5243a688"
			}, 
		set: {
			childtweets: {
				content: "AddChildTest",
				owner: {
					id: "0x1a5243a688"
					}, 
				likes: 15,
				creator: {
					id: "0x1a50d28a75"
					}
				}
			}
		}
	) {
    numUids
  }
}


*/

/*

ratel query
{
  MyQuery(func: type(Tweet)) {
    uid
    Tweet.likes
    Tweet.content
    Tweet.creator {
			User.email
    }
    Tweet.childtweets {
      Tweet.content
      uid
      Tweet.likes
    }
  }
}

*/ 