import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ssrQuery } from '$lib/ssr.server';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) {
		redirect(302, '/welcome');
	}

	const profile = await ssrQuery({ cookies }).GetProfile();

	return { profile };
};
