import { loadOwner, type FrontPageState , type user} from '../../../graphql/fetchData';
export async function load({ params }) {

	const data = await loadOwner(params.id)
	return data;
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
	childtweetsAggregate : {count:number}
	childtweets : [{content:string,id:string,likes:number,childtweetsAggregate : {count:number}}]
}

