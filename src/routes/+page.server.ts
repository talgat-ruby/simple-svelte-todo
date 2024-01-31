import { error } from '@sveltejs/kit';

type Todo = {
	id: string;
	description: string;
	done: boolean;
};

type ResponseBody = {
	success: boolean;
	data: Todo[];
};

export const load = async ({ fetch }) => {
	try {
		const response = await fetch('/api/todo');

		if (!response.ok) {
			await Promise.reject(new Error(`${response.status} - ${response.statusText}`));
		}

		const json: ResponseBody = await response.json();

		return json;
	} catch (err) {
		if (err instanceof Error) {
			return error(400, err?.message);
		}
		return error(500);
	}
};
