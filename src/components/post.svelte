<script lang="ts" >
	import type {random, user, tweet } from '../graphql/fetchData';
	import  {DeleteTweet } from '../graphql/fetchData';
	export let user: user;

	let tweets = user.tweets

	async function deleteTweet(tweet: string,contetn:string) {
		console.log(tweet + "   " + contetn  )
		console.log(user.name + " " + user.id)
		tweets = user.tweets.filter(x => x.id != tweet)
		await DeleteTweet(user.id,tweet);
		

	}

</script>




{#key tweets}
    
	{#each tweets as x }	
		<div>
			<div class="card p-4 card-hover p-4 w-80">
				<div class="bg-blue-900 rounded p-4 w-full  content-center ">
					<h2>
						 {x.content}</h2>
				</div>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span> {user.name}</span>
					<span> {x.likes}</span>
				</label>
					
						<button type="button"  class="btn-icon  bg-error-900  absolute top-[-10px] right-[-10px]" on:click={() => deleteTweet(x.id,x.content)} >
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-error-900  w-6 h-6">
								<path stroke-linecap="round"  stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
							  </svg>
						</button>	

					
			</div>
		
		</div>
					
	{/each}	


{/key}
	


