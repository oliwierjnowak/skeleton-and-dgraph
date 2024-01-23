<!-- src/routes/url/[name].svelte -->
<script   lang="ts">
	import type { movieSingle } from "../../graphql/fetchData.js";



	export let data : movieSingle;
	console.log(data)
	let movies = data.movie

</script>


  
  <div class="flex  items-center justify-center h-screen">
	
	  <!-- Native Table Element -->
	  <table class="table table-hover w-9/12">
		<thead>
		  <tr>
			<th>name</th>
			<th>description</th>
			<th>rating</th>
		  </tr>
		</thead>
		<tbody>
		  {#each movies as row}
			<tr>
			  <td>{row.name}</td>
			  <td>{row.description}</td>
			  <td>{row.rating}</td>
			</tr>
		  {/each}
		</tbody>
		<tfoot>
		  <tr>
			<th colspan="3">Movies insgesamt</th>
			<td>{movies.length}</td>
		  </tr>
		</tfoot>
	  </table>
	</div>
