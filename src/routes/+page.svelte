<script context="module" lang="ts">
	import { fetchData}  from '../graphql/fetchData';
	import type {random, user, tweet } from '../graphql/fetchData';
</script>


<script lang="ts" >
	import Post from "../components/post.svelte";
	import { onMount } from "svelte";
	import Send from "../components/send.svelte";
	import TweeterUsers from '../components/list.svelte'
	let userData: random
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


	let a = [1,2,3,4,5]

	let selectedID: string ;


</script>

<div class="container h-3/6 mx-auto flex">
	<div class="columns-sm flex-1  p-4 space-y-10 text-center items-center">
		{#if loaded == true && selectedID}
			<Send userID={selectedID}/>
		{:else}
			<span>no user selected</span>
		{/if}

	</div>
  
	<div class="columns-lg flex-4 p-10 space-y-10 text-center flex flex-col items-center">
		<div class="bg-blue-900 rounded p-4 w-full md:w-2/3 lg:w-4/6 xl:w-4/6">
			<h1> all posts</h1>
		</div>

		{#if loaded == true}
			{#each userData.queryUser as user }

			<Post {user} />
			{/each}	
		{:else}
			<p>false</p>
		{/if}

		

	</div>
  
	<div class="columns-sm flex-1 bg-blue-500 p-4 space-y-10 text-center items-center">
	  <!-- Content for the third container -->

		{#if loaded == true}
			<TweeterUsers bind:users={userData} bind:selectionUserID={selectedID}/>
				
		{:else}
			<p>false</p>
		{/if}

	</div>
  </div>


