import db from '$lib/db';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const todos = db.getTodos();
	return json({ success: true, data: todos });
};

type RequestBody = {
	description: string;
};

export const POST: RequestHandler = async ({ request }) => {
	const { description }: RequestBody = await request.json();
	db.add({ description, done: false });

	return json({ success: true });
};
