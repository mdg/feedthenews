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

export type RootMaker = {
  isMaker?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  platformType?: Maybe<PlatformType>;
  sponsorships?: Maybe<Array<Maybe<Sponsorship>>>;
  status?: Maybe<UserStatus>;
  userType?: Maybe<UserType>;
};

export type RootQueryType = {
  maker?: Maybe<RootMaker>;
  search?: Maybe<RootSearch>;
  user?: Maybe<RootUser>;
  /** Get the current News API version */
  version?: Maybe<Scalars['String']['output']>;
};

export type RootSearch = {
  makers?: Maybe<UserSet>;
};

export type RootUser = {
  email?: Maybe<Scalars['String']['output']>;
  isMaker?: Maybe<Scalars['Boolean']['output']>;
  isStaff?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  platformType?: Maybe<PlatformType>;
  privacy?: Maybe<UserPrivacy>;
  sponsorships?: Maybe<Array<Maybe<Sponsorship>>>;
  status?: Maybe<UserStatus>;
  subscription?: Maybe<SubRef>;
  userType?: Maybe<UserType>;
};

export type Sponsorship = {
  anonymous?: Maybe<Scalars['Boolean']['output']>;
  insertedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  maker?: Maybe<UserRef>;
  matching?: Maybe<Scalars['Boolean']['output']>;
  sponsor?: Maybe<UserRef>;
  status?: Maybe<SubscriptionStatus>;
  statusAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type SubRef = {
  amt?: Maybe<Scalars['Int']['output']>;
  insertedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<SubscriptionStatus>;
  statusAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  PAUSED = 'PAUSED'
}

export enum UserPrivacy {
  ANONYMOUS = 'ANONYMOUS',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export type UserRef = {
  isMaker?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  platformType?: Maybe<PlatformType>;
  status?: Maybe<UserStatus>;
  userType?: Maybe<UserType>;
};

export type UserSet = {
  next?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<Maybe<UserRef>>>;
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

export type GetDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardQueryResult = { user?: { sponsorships?: Array<{ status?: SubscriptionStatus | null, anonymous?: boolean | null, insertedAt?: any | null, maker?: { name?: string | null } | null } | null> | null, subscription?: { amt?: number | null, status?: SubscriptionStatus | null, insertedAt?: any | null } | null } | null, maker?: { sponsorships?: Array<{ sponsor?: { name?: string | null } | null } | null> | null } | null };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQueryResult = { user?: { name?: string | null, email?: string | null, phone?: string | null, privacy?: UserPrivacy | null, status?: UserStatus | null, userType?: UserType | null, isStaff?: boolean | null } | null };


export const GetDashboardDocument = gql`
    query GetDashboard {
  user {
    sponsorships {
      status
      anonymous
      insertedAt
      maker {
        name
      }
    }
    subscription {
      amt
      status
      insertedAt
    }
  }
  maker {
    sponsorships {
      sponsor {
        name
      }
    }
  }
}
    `;
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
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetDashboard(variables?: GetDashboardQueryVariables, options?: C): Promise<GetDashboardQueryResult> {
      return requester<GetDashboardQueryResult, GetDashboardQueryVariables>(GetDashboardDocument, variables, options) as Promise<GetDashboardQueryResult>;
    },
    GetProfile(variables?: GetProfileQueryVariables, options?: C): Promise<GetProfileQueryResult> {
      return requester<GetProfileQueryResult, GetProfileQueryVariables>(GetProfileDocument, variables, options) as Promise<GetProfileQueryResult>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;