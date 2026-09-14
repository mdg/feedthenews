import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { bootstrapSession, CSRF_COOKIE_NAME } from '$lib/server/session';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});

const handleSession: Handle = async ({ event, resolve }) => {
	const { csrfToken, user, cookies } = await bootstrapSession();

	event.locals.csrf_token = csrfToken;
	event.locals.user = user;

	const csrfCookie = cookies.find((cookie) => cookie.startsWith(`${CSRF_COOKIE_NAME}=`));
	if (csrfCookie) {
		const [cookieValue, ...attributes] = csrfCookie.split(';');
		const value = cookieValue.slice(CSRF_COOKIE_NAME.length + 1).trim();

		const attrs = attributes.map((attr) => attr.trim()).map((attr) => attr.toLowerCase());
		const secure = attrs.includes('secure');

		event.cookies.set(CSRF_COOKIE_NAME, value, {
			httpOnly: true,
			secure,
			sameSite: 'strict',
			path: '/'
		});
	}

	const response = await resolve(event);

	return response;
};

export const handle: Handle = async ({ event, resolve }) =>
	handleSession({
		event,
		resolve: (event, opts) => handleParaglide({ event, resolve, ...opts })
	});
