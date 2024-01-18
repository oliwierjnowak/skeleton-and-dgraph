<script lang="ts" >
	import type {random, user, tweet } from '../graphql/fetchData';

	export let user: user;

	let tweets = user.tweets

</script>





	{#each tweets as x }
		<div>
			<div class="card p-4 card-hover p-4">
				<div class="bg-blue-900 rounded p-4 w-full md:w-2/3 lg:w-4/6 xl:w-4/6 ">
					<h1>Single post: {user.name}</h1>
				</div>
				<label class="label">
					<span> {x.content}</span>
					<span> {x.likes}</span>
				</label>
			</div>
		</div>			
	{/each}	


