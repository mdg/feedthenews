export interface ApiResult<T> {
	status: number;
	body: T;
}

export interface RequestSignInSuccess {
	success: true;
	message: string;
}

export interface RequestSignInFailure {
	success: false;
	error: string;
	reason?: string;
}

export type RequestSignInResult = RequestSignInSuccess | RequestSignInFailure;

export interface SignInUser {
	id: string;
	name: string;
	phone: string;
}

export interface SignInVerifySuccess {
	success: true;
	message: string;
	user: SignInUser;
	is_new: boolean;
}

export interface SignInVerifyFailure {
	success: false;
	error: string;
}

export type SignInVerifyResult = SignInVerifySuccess | SignInVerifyFailure;

export interface NewsApi {
	requestSignIn(phone: string): Promise<ApiResult<RequestSignInResult>>;
	verifySignIn(phone: string, code: string): Promise<ApiResult<SignInVerifyResult>>;
	signOut(): Promise<ApiResult<Record<string, never>>>;
}

export function newsApi(csrfToken?: string | null): NewsApi {
	async function post<T>(path: string, payload: unknown): Promise<ApiResult<T>> {
		const headers: Record<string, string> = { 'content-type': 'application/json' };

		if (csrfToken) headers['x-csrf-token'] = csrfToken;

		const res = await fetch(path, {
			method: 'POST',
			headers,
			credentials: 'include',
			body: JSON.stringify(payload)
		});

		const text = await res.text();
		const body = (text ? JSON.parse(text) : {}) as T;

		return {
			status: res.status,
			body
		};
	}

	return {
		requestSignIn: (phone) => post('/fetch/sign-in', { phone }),
		verifySignIn: (phone, code) => post('/fetch/sign-in/verify', { phone, code }),
		signOut: () => post('/fetch/sign-out', {})
	};
}
