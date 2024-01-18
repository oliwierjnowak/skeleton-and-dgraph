<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import type {random, user, tweet } from '../graphql/fetchData';
	
    
    export let users: random



	export let selectionUserID: string = "" ;
    function showSelected(){
		console.log(selectionUserID)
	}
</script>

<ListBox >
    {#each users.queryUser as user }

        <ListBoxItem bind:group={selectionUserID} name="medium" on:change={showSelected}  value={user.id}>{user.name}</ListBoxItem>

    {/each}	

  </ListBox>