import { getSdk as getQuerySdk } from './generated/query';
import { getSdk as getMutSdk } from './generated/mut';
import type { DocumentNode } from 'graphql';

export interface GraphQLResponse<T> {
	data?: T;
	errors?: Array<{
		message: string;
		locations?: Array<{ line: number; column: number }>;
		path?: string[];
	}>;
}

const QUERY_WS = /\s+/g;

/// Make a client side fetch using the browser's cookies for auth
export async function queryFetcher<T, TVars>(
	queryDoc: DocumentNode,
	variables: TVars,
	options?: { fetch: any }
): Promise<T> {
	const url = '/fetch/query';
	const fetch_f = options?.fetch ?? fetch;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	const queryRaw = queryDoc.loc?.source?.body || queryDoc.toString();
	const query = queryRaw.trim().replaceAll(QUERY_WS, ' ');

	const body = JSON.stringify({
		query,
		variables
	});

	const response = await fetch_f(url, {
		method: 'POST',
		headers,
		body
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const resp: GraphQLResponse<T> = await response.json();

	if (resp.errors) {
		throw new Error(resp.errors[0]?.message || 'GraphQL query failed');
	}

	if (!resp.data) {
		throw new Error('No data returned from query');
	}

	return resp.data;
}

export async function mutFetcher<T, TVars>(
	csrf: string,
	queryDoc: DocumentNode,
	variables: TVars,
	options?: { fetch: any }
): Promise<T> {
	// mutations are only run client side
	const url = '/fetch/mut';
	const fetch_f = options?.fetch ?? fetch;

	const headers: Record<string, string> = {
		'x-csrf-token': csrf,
		'Content-Type': 'application/json'
	};

	const queryRaw = queryDoc.loc?.source?.body || queryDoc.toString();
	const query = queryRaw.trim().replaceAll(QUERY_WS, ' ');

	const body = JSON.stringify({
		query,
		variables
	});

	const response = await fetch_f(url, {
		method: 'POST',
		headers,
		body
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const resp: GraphQLResponse<T> = await response.json();

	if (resp.errors) {
		throw new Error(resp.errors[0]?.message || 'GraphQL mut failed');
	}

	if (!resp.data) {
		throw new Error('No data returned from mut');
	}

	return resp.data;
}

// Generated SDK instances

export function fetchQuery(options?: { fetch?: any }) {
	const f = <R, V>(query: DocumentNode, vars?: V): Promise<R> => {
		return queryFetcher<R, V>(
			query,
			vars as V,
			options?.fetch ? { fetch: options.fetch } : undefined
		);
	};
	return getQuerySdk(f);
}

export function fetchMut(csrf: string, options?: { fetch?: any }) {
	const f = <R, V>(query: DocumentNode, vars?: V): Promise<R> => {
		return mutFetcher<R, V>(
			csrf,
			query,
			vars as V,
			options?.fetch ? { fetch: options.fetch } : undefined
		);
	};
	return getMutSdk(f);
}
