<script context="module" lang="ts">
	import { fetchData}  from '../graphql/fetchData';
	import type {random, user, tweet } from '../graphql/fetchData';
	import { Autocomplete,popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

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
			console.log(userData.queryUser[0].name)
			usernames = userData.queryUser.map(x => x.name)
		
		/*	 flavorOptions = userData.queryUser.map(user => ({
					label: user.name,      
					value: user.id,        
					keywords: user.email,  
					meta: { healthy: false }
				}));*/

			
	
			loaded = true;
		} catch (error) {
		console.error('Error fetching data:', error);
		}
  });
	let a = [1,2,3,4,5]


	// Local
	let inputPopupDemo = '';
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let inputDemo = '';
	let inputAllowlist = '';
	type FlavorOption = AutocompleteOption<string, { healthy: boolean }>;
	const flavorOptions: FlavorOption[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];
	function onPopupDemoSelect(event: CustomEvent<FlavorOption>): void {
		inputPopupDemo = event.detail.label;
	}
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

	  {#if loaded == true}
	  <p>true</p>
	  <h1>{userData.queryUser[0].name}</h1>
	

  {:else}
	  <p>false</p>
  {/if}

	</div>
  </div>


  <div class="text-token w-full max-w-sm space-y-2">
	<input
		class="input autocomplete"
		type="search"
		name="autocomplete-search"
		bind:value={inputPopupDemo}
		placeholder="Search..."
		use:popup={popupSettings}
	/>
	<div data-popup="popupAutocomplete" class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
		<Autocomplete bind:input={inputPopupDemo} options={flavorOptions} on:selection={onPopupDemoSelect} />
	</div>
</div>