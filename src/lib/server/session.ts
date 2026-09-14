import { env } from '$env/dynamic/private';

export const CSRF_COOKIE_NAME = '_feedthenews_key';

export interface SessionBootstrap {
	csrfToken: string | null;
	cookies: string[];
}

export async function bootstrapSession(): Promise<SessionBootstrap> {
	const baseUrl = env.API_BASE_URL ?? 'http://localhost:4100';

	const res = await fetch(`${baseUrl}/ssr/session`, {
		method: 'POST'
	});

	if (!res.ok) {
		return { csrfToken: null, cookies: [] };
	}

	const body = (await res.json()) as { csrf_token?: string };
	const cookies = res.headers.getSetCookie();

	return {
		csrfToken: body.csrf_token ?? null,
		cookies
	};
}
