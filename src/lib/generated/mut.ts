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

export type RootMutationType = {
	/** Placeholder mutation; replaced once the News domain is defined */
	ping?: Maybe<Scalars['String']['output']>;
	user?: Maybe<RootUserMut>;
};

export type RootQueryType = {
	zero?: Maybe<Scalars['Int']['output']>;
};

export type RootUserMut = {
	setName?: Maybe<Scalars['String']['output']>;
};

export type RootUserMutSetNameArgs = {
	newName?: InputMaybe<Scalars['String']['input']>;
};

export type SetUserNameMutationVariables = Exact<{
	newName: Scalars['String']['input'];
}>;

export type SetUserNameMutationResult = { user?: { setName?: string | null } | null };

export const SetUserNameDocument = gql`
	mutation SetUserName($newName: String!) {
		user {
			setName(newName: $newName)
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
		SetUserName(
			variables: SetUserNameMutationVariables,
			options?: C
		): Promise<SetUserNameMutationResult> {
			return requester<SetUserNameMutationResult, SetUserNameMutationVariables>(
				SetUserNameDocument,
				variables,
				options
			) as Promise<SetUserNameMutationResult>;
		}
	};
}
export type Sdk = ReturnType<typeof getSdk>;
