<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import type {FrontPageState, user, tweet } from '../graphql/fetchData';
	export let data: FrontPageState


	export let selectionUserID: string = "" ;
    
    let users = data.queryTweet.map( x=> x.creator)
    function showSelected(){
		console.log(selectionUserID)
	}
</script>

<ListBox >
    {#each users as user }

        <ListBoxItem bind:group={selectionUserID} name="medium" on:change={showSelected}  value={user[0].id}>{user[0].name}</ListBoxItem>

    {/each}	

  </ListBox>