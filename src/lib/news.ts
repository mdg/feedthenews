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
}

export function newsApi(): NewsApi {
	async function post<T>(path: string, payload: unknown): Promise<ApiResult<T>> {
		const res = await fetch(path, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(payload)
		});

		const body = (await res.json()) as T;

		return {
			status: res.status,
			body
		};
	}

	return {
		requestSignIn: (phone) => post('/fetch/sign-in', { phone }),
		verifySignIn: (phone, code) => post('/fetch/sign-in/verify', { phone, code })
	};
}
