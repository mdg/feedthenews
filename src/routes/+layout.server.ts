import type { LayoutServerLoad } from './$types';
import { ssrQuery } from '$lib/ssr.server';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	let isSubscriber = false;

	return {
		csrf_token: locals.csrf_token,
		sessionUser: locals.user
	};
};
