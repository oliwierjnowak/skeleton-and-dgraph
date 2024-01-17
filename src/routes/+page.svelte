<script lang="ts" context="module">
	import Post from "../components/post.svelte";
    import { request, gql } from "graphql-request";

const query = gql`
  {
    countries {
      name
      emoji
    }
  }
`;

export const load = async () => {
  const data = await request("https://countries.trevorblades.com/", query);
  return {
    props: {
      data,
    },
  };
};
	

</script>

<script >
	let a  = [1,2,3,4,5,6,7];
	export let data =  load ;

	console.log(data)
</script>
  
  <!-- {JSON.stringify(data)} -->
  



<div class="container h-3/6 mx-auto flex">
	<div class="columns-sm flex-1 bg-blue-500 p-4 space-y-10 text-center items-center">
	  <!-- Content for the first container -->
	  First Container
	</div>
  
	<div class="columns-lg flex-4 p-10 space-y-10 text-center flex flex-col items-center">
		<div class="bg-blue-900 rounded p-4 w-full md:w-2/3 lg:w-4/6 xl:w-4/6">
			<h1> all posts</h1>
		  </div>
		{#each a as item }

		<Post {item} />
		{/each}	
		

	</div>
  
	<div class="columns-sm flex-1 bg-blue-500 p-4 space-y-10 text-center items-center">
	  <!-- Content for the third container -->
	  Third Container
	</div>
  </div>
