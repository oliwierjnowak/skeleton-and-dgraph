


<script lang="ts" >
	import { fetchData, fetchTopicData}  from '../graphql/fetchData';
	import type {FrontPageState, user, tweet } from '../graphql/fetchData';
	import TweetComponent from "../components/tweetComponent.svelte";
	import { onMount } from "svelte";
	import TweeterUsers from '../components/list.svelte'
	import { ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';
	import Send from '../components/send.svelte';

	const stopsSpinner: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];
	
	let posted : boolean = false;
	export let FrontState: FrontPageState

	let loaded  =false;
	let usernames: string[]
	let topics : user[];
	onMount(async () => {
		
		
		try {
			FrontState = await fetchData() ;
		
			topics = await fetchTopicData();
			
		//	let users = userData.tweetDatweets		//	usernames = users[0].map(x => x.name)
			loaded = true;
		} catch (error) {
		console.error('Error fetching data:', error);
		}
  	});

	  let state : FrontPageState = {queryTweet:[]};
	export let reloadTweets = async () => {
		loaded = false;
		FrontState = await fetchData() ;
	 
		 state = FrontState
		loaded = true;  
	
	}

	let user : user = {
		color:"",
		email:"",
		id:"",
		name:""
	};
	let a = [1,2,3,4,5]

	let selectedID: string ;


</script>

<div class="container h-3/6 mx-auto flex">
	
	<div class="columns-sm  flex-1 p-10 space-y-10 text-center items-center">
		{#if loaded == true && selectedID} <Send childTweet={false} userID={selectedID} bind:reloadTweets={reloadTweets} topic={""}/>
		{:else}
			<span>no topic selected</span>
		{/if}

	</div>
  
	<div class=" columns-lg flex-4 p-10 space-y-10 text-center flex flex-col items-center">
		
		
	

		{#if loaded == true}
			{#each FrontState.queryTweet as tweet }
				<a  href="/details/{tweet.id}">

					<TweetComponent  state={tweet}  />
				
				</a>
		
			
			{/each}	
		{:else}
			<ConicGradient stops={stopsSpinner} spin width="w-8">
				
			</ConicGradient>
		{/if}

			

	</div>
  
	<div class="columns-sm flex-1  p-4 space-y-10 text-center items-center">
		
		<h3>Choose topic to share your opinion about or select tweet to view comments</h3>
	  <!-- Content for the third container -->
		{#if loaded == true}
			<TweeterUsers bind:data={topics} bind:selectedTopicID={selectedID}/>
				
		{:else}
			<ConicGradient stops={stopsSpinner} spin width="w-8">
				
			</ConicGradient>
		{/if}

	</div>
  </div>


