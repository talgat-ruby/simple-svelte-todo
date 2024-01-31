import type { RequestHandler } from './$types';
import db from '$lib/db';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = ({ params }) => {
	const todo = db.getTodo(params.id);
	return json({ success: true, data: todo });
};

type RequestBody = Partial<{
	description: string;
	done: boolean;
}>;

export const PATCH: RequestHandler = async ({ request, params }) => {
	const body: RequestBody = await request.json();

	db.update(params.id, body);
	return json({ success: true });
};

export const DELETE: RequestHandler = ({ params }) => {
	db.delete(params.id);
	return json({ success: true });
};
