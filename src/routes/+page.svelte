<script lang="ts">
	import type { PageData } from './$types';
	import type { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'svelte/elements';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData = [];

	const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
		const { currentTarget } = event;

		const formData = new FormData(currentTarget);
		const description = formData.get('description');

		try {
			const response = await fetch('/api/todo', { method: 'POST', body: JSON.stringify({ description }) });

			if (!response.ok) {
				await Promise.reject(new Error(`${response.status} - ${response.statusText}`));
			}

			await invalidateAll();
		} catch (err) {
			console.error(err);
		}
	};

	const deleteHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
		const { currentTarget } = event;
		const id = currentTarget.dataset['id'];

		if (!id) {
			return;
		}

		try {
			const response = await fetch(`/api/todo/${id}`, { method: 'DELETE' });

			if (!response.ok) {
				await Promise.reject(new Error(`${response.status} - ${response.statusText}`));
			}

			await invalidateAll();
		} catch (err) {
			console.error(err);
		}
	};

	const changeHandler: ChangeEventHandler<HTMLInputElement> = async (event) => {
		const { currentTarget } = event;
		const id = currentTarget.dataset['id'];

		if (!id) {
			return;
		}

		try {
			const response = await fetch(`/api/todo/${id}`, {
				method: 'PATCH', body: JSON.stringify({
					done: currentTarget.checked
				})
			});

			if (!response.ok) {
				await Promise.reject(new Error(`${response.status} - ${response.statusText}`));
			}

			await invalidateAll();
		} catch (err) {
			console.error(err);
		}
	};
</script>

<h1>Todo</h1>
<form on:submit={submitHandler}>
	<input name="description" type="text" />
	<button type="submit">Create todo</button>

	<ul>
		{#each data.data as todo (todo.id)}
			<li>
				<input data-id={todo.id} type="checkbox" checked={todo.done} on:change={changeHandler}>
				<a href={`/${todo.id}`} class="description">{todo.description}</a>
				<button data-id={todo.id} type="button" on:click={deleteHandler}>❌</button>
			</li>
		{/each}
	</ul>
</form>

<style>
    input:checked + .description {
        text-decoration: line-through;
    }
</style>
