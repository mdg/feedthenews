import type { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type RootQueryType = {
	user?: Maybe<RootUser>;
	/** Get the current News API version */
	version?: Maybe<Scalars['String']['output']>;
};

export type RootUser = {
	email?: Maybe<Scalars['String']['output']>;
	isStaff?: Maybe<Scalars['Boolean']['output']>;
	name?: Maybe<Scalars['String']['output']>;
	phone?: Maybe<Scalars['String']['output']>;
	privacy?: Maybe<UserPrivacy>;
	status?: Maybe<UserStatus>;
	userType?: Maybe<UserType>;
};

export enum UserPrivacy {
	ANONYMOUS = 'ANONYMOUS',
	PRIVATE = 'PRIVATE',
	PUBLIC = 'PUBLIC'
}

export enum UserStatus {
	ACTIVE = 'ACTIVE',
	BANNED = 'BANNED',
	CLOSED = 'CLOSED',
	DELETED = 'DELETED',
	INACTIVE = 'INACTIVE',
	PENDING = 'PENDING'
}

export enum UserType {
	SYSTEM = 'SYSTEM',
	USER = 'USER'
}

export type GetProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfileQueryResult = {
	user?: {
		name?: string | null;
		email?: string | null;
		phone?: string | null;
		privacy?: UserPrivacy | null;
		status?: UserStatus | null;
		userType?: UserType | null;
		isStaff?: boolean | null;
	} | null;
};

export const GetProfileDocument = gql`
	query GetProfile {
		user {
			name
			email
			phone
			privacy
			status
			userType
			isStaff
		}
	}
`;
export type Requester<C = {}, E = unknown> = <R, V>(
	doc: DocumentNode,
	vars?: V,
	options?: C
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
	return {
		GetProfile(variables?: GetProfileQueryVariables, options?: C): Promise<GetProfileQueryResult> {
			return requester<GetProfileQueryResult, GetProfileQueryVariables>(
				GetProfileDocument,
				variables,
				options
			) as Promise<GetProfileQueryResult>;
		}
	};
}
export type Sdk = ReturnType<typeof getSdk>;
