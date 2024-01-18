<script lang="ts">

    let content = '';

	export let userID: string;
	const handleUpload = () => {
        console.log('Content:', content);
        console.log(userID)
    };
</script>


<form on:submit|preventDefault={handleUpload}>

    <label for="content" class="label">
        <span>Send tweet</span>
        <textarea   bind:value={content} id="content" class="textarea" rows="4" placeholder="new tweet" />
    </label>
    
<button type="submit">Upload</button>
</form>