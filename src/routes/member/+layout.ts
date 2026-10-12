import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { sessionUser } = await parent();

	if (!sessionUser) {
		redirect(302, '/welcome');
	}
};
