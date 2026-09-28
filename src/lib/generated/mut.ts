import type { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  NaiveDateTime: { input: any; output: any; }
};

export enum PlatformType {
  ACTIVITYPUB = 'ACTIVITYPUB',
  ATPROTO = 'ATPROTO',
  FEEDTHENEWS = 'FEEDTHENEWS',
  PODCAST = 'PODCAST',
  WEBSITE = 'WEBSITE',
  YOUTUBE = 'YOUTUBE'
}

export type RootMutationType = {
  /** Placeholder mutation; replaced once the News domain is defined */
  ping: Scalars['String']['output'];
  sessionUser: RootUserMut;
};

export type RootQueryType = {
  zero: Scalars['Int']['output'];
};

export type RootUserMut = {
  cancelSubscription?: Maybe<SubRef>;
  setIsMaker: Scalars['Boolean']['output'];
  setName: Scalars['String']['output'];
  sponsor: Sponsorship;
  subscribe: SubRef;
};


export type RootUserMutSetIsMakerArgs = {
  isMaker?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RootUserMutSetNameArgs = {
  newName: Scalars['String']['input'];
};


export type RootUserMutSponsorArgs = {
  maker: Scalars['String']['input'];
};


export type RootUserMutSubscribeArgs = {
  amt: Scalars['Int']['input'];
};

export type Sponsorship = {
  anonymous: Scalars['Boolean']['output'];
  insertedAt: Scalars['NaiveDateTime']['output'];
  maker?: Maybe<UserRef>;
  matching: Scalars['Boolean']['output'];
  sponsor?: Maybe<UserRef>;
  status: SubscriptionStatus;
  statusAt: Scalars['NaiveDateTime']['output'];
};

export type SubRef = {
  amt: Scalars['Int']['output'];
  insertedAt: Scalars['NaiveDateTime']['output'];
  status: SubscriptionStatus;
  statusAt: Scalars['NaiveDateTime']['output'];
};

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  PAUSED = 'PAUSED'
}

export type UserRef = {
  isMaker: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  platformType: PlatformType;
  status: UserStatus;
  userType: UserType;
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export enum UserType {
  IMPORT = 'IMPORT',
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export type SetUserNameMutationVariables = Exact<{
  newName: Scalars['String']['input'];
}>;


export type SetUserNameMutationResult = { sessionUser: { setName: string } };


export const SetUserNameDocument = gql`
    mutation SetUserName($newName: String!) {
  sessionUser {
    setName(newName: $newName)
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    SetUserName(variables: SetUserNameMutationVariables, options?: C): Promise<SetUserNameMutationResult> {
      return requester<SetUserNameMutationResult, SetUserNameMutationVariables>(SetUserNameDocument, variables, options) as Promise<SetUserNameMutationResult>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;