import { request } from 'graphql-request';

const query = `
query MyQuery {
  queryDirector {
    age
    gender
    id
    name
    movie {
      id
      name
      rating
      description
    }
  }
}`;


export type DqlData = {
  queryDirector: Director[]
}
export type Director = {
  id: string,
  name: string,
  age: number,
  gender: string,
  movie : Movie []
}
export type Movie = {
  id : string,
  name: string,
  rating: number,
  description: string,
}

export const fetchData = async (): Promise<DqlData> => {
  try {
    const data = await request<DqlData>("https://nameless-brook-560057.eu-central-1.aws.cloud.dgraph.io/graphql", query);
    return data;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw error;
  }
};

export type DqlSingleData = {
  getDirector: movieSingle
}
export type movieSingle = {
   "movie": Movie[]
}

export const fetchSingleData = async (id: string): Promise<DqlSingleData> => {
  try {
    const data = await request<DqlSingleData>("https://nameless-brook-560057.eu-central-1.aws.cloud.dgraph.io/graphql", `
    query MyQuery {
      getDirector(id: "${id}") {
        movie {
          id
          name
          rating
          description
        }
      }
    }`);
  
    return data;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw error;
  }
};



