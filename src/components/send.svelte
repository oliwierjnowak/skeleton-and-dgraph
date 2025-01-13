<script lang="ts">
    import {AddNewTweet, type FrontPageState} from '../graphql/fetchData'
    let content = '';

	export let userID: string;
    export let reloadTweets :() => Promise<void>; 
    export let childTweet: boolean;
    export let topic : string
    let posting :boolean = false
	const handleUpload = async () => {
        posting = true
        await reloadTweets;
        let request;
        if(!childTweet){
             request = await AddNewTweet(childTweet,userID,content,undefined);
        }else{
             request = await AddNewTweet(childTweet,userID,content,topic);
        }
       
        if(request){
            content = ''
        }
        posting = false;
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
      
    </ConicGradient>
{:else}
    <form on:submit|preventDefault={handleUpload}>

        <label for="content" class="label">
           
            <textarea   bind:value={content} id="content" class="textarea" rows="4" placeholder="new tweet" />
        </label>
        
    <button type="submit"><h3>Upload tweet</h3></button>
    </form>
{/if}


