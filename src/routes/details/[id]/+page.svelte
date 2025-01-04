<script lang="ts">
	import {  loadOwner, type ownerTweet, type tweet } from "../../../graphql/fetchData";
    import TweetComponent from "../../../components/tweetComponent.svelte";
    import Send from "../../../components/send.svelte";
    export let data : ownerTweet;



    export let reloadTweets = async () => {
        data = await loadOwner(data.id)
	}
</script>





    <div class="container h-3/6 mx-auto flex">
	
        <div class="w-1/4 p-10 space-y-10 text-center flex flex-col items-center">
            <Send childTweet={true}  userID={data.id} bind:reloadTweets={reloadTweets} topic={data.creator[0].id}/>
        </div>
      
        <div class="w-3/4 p-10 space-y-10 text-center flex flex-col items-center">
            <TweetComponent  state={{
                content : data.content,
                creator : data.creator,
                id : data.id,
                likes : data.likes,
                comments :((data.childtweetsAggregate?.count ?? 0) + "")
            }}  />
        
    
            {#each data.childtweets as tweet }
            <a  href="/details/{tweet.id}">

                <TweetComponent  state={ {
                    content : tweet.content,
                    creator : data.creator,
                    id : tweet.id,
                    likes : tweet.likes,
                    comments : ((tweet.childtweetsAggregate?.count ?? 0) + "")

                } }  />
            
            </a>
    
        
        {/each}	
    
        </div>
      
   
      </div>
    
    
    

