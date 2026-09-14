// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			csrf_token: string | null;
			user: { id: string; name: string; phone: string } | null;
		}
		interface PageData {
			csrf_token: string | null;
			user: { id: string; name: string; phone: string } | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
