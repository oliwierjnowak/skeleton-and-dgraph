<script context="module" lang="ts">
	import { fetchData}  from '../graphql/fetchData';
	import type {random, user, tweet } from '../graphql/fetchData';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
</script>


<script lang="ts" >
	import Post from "../components/post.svelte";
	import { onMount } from "svelte";
	let userData: random
	let loaded  =false;
	let users : user[];
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

  let content = '';
	let a = [1,2,3,4,5]

	let valueSingle: string ;
	function showSelected(){
		console.log(valueSingle)
	}
	const handleUpload = () => {
    // Handle the upload logic here
    console.log('Content:', content);
    // You can send the content to the server or perform any other action.
  };
</script>

<div class="container h-3/6 mx-auto flex">
	<div class="columns-sm flex-1 bg-blue-500 p-4 space-y-10 text-center items-center">
		{#if loaded == true && valueSingle}
			<form on:submit|preventDefault={handleUpload}>

				<label for="content" class="label">
					<span>Send tweet</span>
					<textarea   bind:value={content} id="content" class="textarea" rows="4" placeholder="new tweet" />
				</label>
				
			<button type="submit">Upload</button>
			</form>
		{:else}
			<span>no user selected</span>
		{/if}

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

	  {#if loaded == true}
	  <ListBox >
	  {#each userData.queryUser as user }

	  	<ListBoxItem bind:group={valueSingle} name="medium" on:change={showSelected}  value={user.id}>{user.name}</ListBoxItem>
	
	  {/each}	
	 
	</ListBox>
				
  {:else}
	  <p>false</p>
  {/if}

	</div>
  </div>


