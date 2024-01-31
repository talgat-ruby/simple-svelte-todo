<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData = [];
</script>

<h1 class:done={data.data.done}>{data.data.description}</h1>

<a href="/">Back to Main</a>

<style>
    .done {
        text-decoration: line-through;
    }
</style>
