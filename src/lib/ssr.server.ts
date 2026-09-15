import { getSdk as getQuerySdk } from './generated/query';
import type { DocumentNode } from 'graphql';
import { withSpan, getTraceHeaders } from './telemetry';
import { SpanKind } from '@opentelemetry/api';
import { env } from '$env/dynamic/private';

export interface GraphQLResponse<T> {
	data?: T;
	errors?: Array<{
		message: string;
		locations?: Array<{ line: number; column: number }>;
		path?: string[];
	}>;
}

const QUERY_WS = /\s+/g;

export function getSsrUrl(path: string): string {
	const base = env.API_BASE_URL ?? 'http://localhost:4100';
	return base + path;
}

export async function ssrQueryFetcher<T, TVars>(
	queryDoc: DocumentNode,
	variables?: TVars,
	cookieStr?: string
): Promise<T> {
	return withSpan(
		'ssrQueryFetcher',
		async () => {
			const url = getSsrUrl('/fetch/query');
			const traceHeaders = getTraceHeaders();

			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
				...traceHeaders
			};

			if (cookieStr) {
				headers['Cookie'] = cookieStr;
			}

			const queryRaw = queryDoc.loc?.source?.body || queryDoc.toString();
			const query = queryRaw.trim().replaceAll(QUERY_WS, ' ');

			const body = JSON.stringify({
				query,
				variables
			});

			const response = await fetch(url, {
				method: 'POST',
				headers,
				body
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const resp: GraphQLResponse<T> = await response.json();

			if (resp.errors) {
				const msg = resp.errors[0]?.message || 'GraphQL query failed';
				const errorPath = resp.errors[0].path;
				throw new Error(msg + ' at ' + errorPath);
			}

			if (!resp.data) {
				throw new Error('No data returned from query');
			}

			return resp.data;
		},
		{ kind: SpanKind.CLIENT }
	);
}

// Generated SDK instances

export function ssrQuery({
	cookies
}: {
	cookies: { getAll(): { name: string; value: string }[] };
}) {
	const f = <R, V>(query: DocumentNode, vars?: V): Promise<R> => {
		const cookieStr = cookies
			.getAll()
			.map((cookie: { name: string; value: string }) => `${cookie.name}=${cookie.value}`)
			.join('; ');

		return ssrQueryFetcher<R, V>(query, vars, cookieStr);
	};
	return getQuerySdk(f);
}
