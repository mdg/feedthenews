import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ssrQuery } from '$lib/ssr.server';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) {
		redirect(302, '/welcome');
	}

	const { sessionUser } = await ssrQuery({ cookies }).GetSubscription();

	return { subscription: sessionUser?.subscription ?? null };
};
