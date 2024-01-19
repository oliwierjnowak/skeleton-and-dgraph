


<script lang="ts" >
	import { fetchData}  from '../graphql/fetchData';
	import type {random, user, tweet } from '../graphql/fetchData';
	import Post from "../components/post.svelte";
	import { onMount } from "svelte";
	import Send from "../components/send.svelte";
	import TweeterUsers from '../components/list.svelte'
	import { ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';
	
	const stopsSpinner: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];
	
	let posted : boolean = false;
	export let userData: random
	let loaded  =false;
	let usernames: string[]
	onMount(async () => {
		
		
		try {
			userData = await fetchData() ;
			usernames = userData.queryUser.map(x => x.name)
				
			loaded = true;
		} catch (error) {
		console.error('Error fetching data:', error);
		}
  	});

	export let reloadTweets = async () => {
		loaded = false;
		userData = await fetchData() ;
		loaded = true;  
		console.log('hello')
	}


	let a = [1,2,3,4,5]

	let selectedID: string ;


</script>

<div class="container h-3/6 mx-auto flex">
	
	<div class="columns-sm  flex-1 p-10 space-y-10 text-center items-center">
		{#if loaded == true && selectedID}
			<Send userID={selectedID} bind:reloadTweets={reloadTweets}/>
		{:else}
			<span>no user selected</span>
		{/if}

	</div>
  
	<div class=" columns-lg flex-4 p-10 space-y-10 text-center flex flex-col items-center">
		<div class="bg-blue-900 rounded p-4 w-full md:w-2/3 lg:w-4/6 xl:w-4/6">
			<h1> all posts</h1>
		</div>

		{#if loaded == true}
			{#each userData.queryUser as user }
			
					<Post user={user}   />
				
		
			
			{/each}	
		{:else}
			<ConicGradient stops={stopsSpinner} spin width="w-8">
				
			</ConicGradient>
		{/if}

			

	</div>
  
	<div class="columns-sm flex-1  p-4 space-y-10 text-center items-center">
	  <!-- Content for the third container -->

		{#if loaded == true}
			<TweeterUsers bind:users={userData} bind:selectionUserID={selectedID}/>
				
		{:else}
			<ConicGradient stops={stopsSpinner} spin width="w-8">
				
			</ConicGradient>
		{/if}

	</div>
  </div>


