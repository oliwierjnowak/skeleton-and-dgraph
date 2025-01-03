<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import type {FrontPageState, user, tweet } from '../graphql/fetchData';
	export let data: user[]


	export let selectedTopicID: string = "" ;
    
   // let users = data.map( x=> x.creator)
    function showSelected(){
		console.log(selectedTopicID)
	}
</script>

<ListBox >
    {#each data as user }

        <ListBoxItem bind:group={selectedTopicID} name="medium" on:change={showSelected}  value={user.id}>{user.name}</ListBoxItem>

    {/each}	

  </ListBox>