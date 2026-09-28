import type { PageServerLoad } from './$types';
import { ssrQuery } from '$lib/ssr.server';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const { user } = await ssrQuery({ cookies }).GetUser({ user: params.user });

	return { user };
};
