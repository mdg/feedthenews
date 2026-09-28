import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ssrQuery } from '$lib/ssr.server';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const { user } = await ssrQuery({ cookies }).GetUser({ user: params.user });

	if (!user) {
		error(404, 'User not found');
	}

	return { user };
};
