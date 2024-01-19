<script lang="ts">
    import {AddNewTweet, type random} from '../graphql/fetchData'
    let content = '';

	export let userID: string;
    export let reloadTweets :() => Promise<void>; 
    let posting :boolean = false
	const handleUpload = async () => {
        posting = true
        await reloadTweets;
        const request = await AddNewTweet(userID,content);
        if(request){
            content = ''
        }
        await reloadTweets();
       
      
    };


    import { ConicGradient } from '@skeletonlabs/skeleton';
    import type { ConicStop } from '@skeletonlabs/skeleton';
	const stopsSpinner: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];
</script>



<!-- svelte-ignore empty-block -->
{#if posting == true }
    <ConicGradient stops={stopsSpinner} spin width="w-8">
        <p class="text-token">Loading</p>
    </ConicGradient>
{:else}
    <form on:submit|preventDefault={handleUpload}>

        <label for="content" class="label">
            <span>Send tweet</span>
            <textarea   bind:value={content} id="content" class="textarea" rows="4" placeholder="new tweet" />
        </label>
        
    <button type="submit">Upload</button>
    </form>
{/if}


