<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import type {FrontPageState, user, tweet } from '../graphql/fetchData';
	export let data: user[]


	export let selectedTopicID: string = "" ;
    
   // let users = data.map( x=> x.creator)
    function showSelected(){
		
	}
</script>

<ListBox >
    {#each data as user }
        

            <ListBoxItem bind:group={selectedTopicID} name="medium" on:change={showSelected} class="bg-{user.color}-300"  value={user.id}>{user.name} </ListBoxItem>

        
    {/each}	

  </ListBox>