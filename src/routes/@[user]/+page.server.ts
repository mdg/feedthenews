import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ssrQuery } from '$lib/ssr.server';

export const load: PageServerLoad = async ({ params, cookies }) => {
	try {
		const { user } = await ssrQuery({ cookies }).GetUser({ user: params.user });

		return { profile: user };
	} catch (e) {
		if (e instanceof Error && /^not_found\b/i.test(e.message)) {
			error(404, 'User not found');
		}
		throw e;
	}
};
