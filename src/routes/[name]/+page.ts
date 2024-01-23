import { fetchSingleData } from '../../graphql/fetchData.js'
import type { Movie, movieSingle } from '../../graphql/fetchData.js';

export const load = async ({fetch,  params}) : Promise<movieSingle> => {
    const data = await fetchSingleData(params.name);
    console.log(data.getDirector)
    return data.getDirector
}   