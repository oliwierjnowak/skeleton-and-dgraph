<script context="module" lang="ts">
	import { fetchData}  from '../graphql/fetchData';
	import type {random, user, tweet } from '../graphql/fetchData';
</script>


<script lang="ts" >
	import Post from "../components/post.svelte";
	import { onMount } from "svelte";
	
	let userData: random
	let loaded  =false;
	let users : user[];

	onMount(async () => {
		try {
			userData = await fetchData() ;
			console.log(userData.queryUser[0].name)

			loaded = true;
		} catch (error) {
		console.error('Error fetching data:', error);
		}
  });
	let a = [1,2,3,4,5]
	

</script>

<div class="container h-3/6 mx-auto flex">
	<div class="columns-sm flex-1 bg-blue-500 p-4 space-y-10 text-center items-center">
	  <!-- Content for the first container -->
	  First Container
	</div>
  
	<div class="columns-lg flex-4 p-10 space-y-10 text-center flex flex-col items-center">
		<div class="bg-blue-900 rounded p-4 w-full md:w-2/3 lg:w-4/6 xl:w-4/6">
			<h1> all posts</h1>
		</div>

		{#if loaded == true}
			<p>true</p>
			<h1>{userData.queryUser[0].name}</h1>
			{#each userData.queryUser as user }

			<Post {user} />
			{/each}	
		{:else}
			<p>false</p>
		{/if}

		

	</div>
  
	<div class="columns-sm flex-1 bg-blue-500 p-4 space-y-10 text-center items-center">
	  <!-- Content for the third container -->
	  Third Container
	</div>
  </div>
