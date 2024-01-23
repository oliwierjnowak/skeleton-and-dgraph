
<script lang="ts" >
	import { fetchData}  from '../graphql/fetchData';
	import type {DqlData } from '../graphql/fetchData';
	import Post from "../components/post.svelte";
	import { onMount } from "svelte";
	import { ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';
	
	const stopsSpinner: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];
	
	export let fetchedData: DqlData
	let loaded  =false;
	onMount(async () => {
		try {
			fetchedData = await fetchData() ;				
			loaded = true;
		} catch (error) {
		console.error('Error fetching data:', error);
		}
  	});



</script>





	<div class="container  flex items-center justify-center">
		<div class="columns-lg flex-4 p-10 space-y-10 text-center flex flex-col items-center">
			<div class="bg-blue-900 rounded p-4 w-full md:w-2/3 lg:w-4/6 xl:w-4/6">
				<h1> Alle Filme</h1>
			</div>
	
			{#if loaded == true}
				{#each fetchedData.queryDirector as user }
					<Post director={user} />
				{/each}    
			{:else}
				<ConicGradient stops={stopsSpinner} spin width="w-8"></ConicGradient>
			{/if}
		</div>
	</div>
	


