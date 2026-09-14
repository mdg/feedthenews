import { env } from '$env/dynamic/private';

export const CSRF_COOKIE_NAME = '_feedthenews_key';

export interface SessionUser {
	id: string;
	name: string;
	phone: string;
}

export interface SessionBootstrap {
	csrfToken: string | null;
	user: SessionUser | null;
	cookies: string[];
}

export async function bootstrapSession(): Promise<SessionBootstrap> {
	const baseUrl = env.API_BASE_URL ?? 'http://localhost:4100';

	const res = await fetch(`${baseUrl}/ssr/session`, {
		method: 'POST'
	});

	if (!res.ok) {
		return { csrfToken: null, user: null, cookies: [] };
	}

	const body = (await res.json()) as { csrf_token?: string; user?: SessionUser | null };
	const cookies = res.headers.getSetCookie();

	return {
		csrfToken: body.csrf_token ?? null,
		user: body.user ?? null,
		cookies
	};
}
