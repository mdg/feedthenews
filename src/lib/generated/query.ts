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

export type PublicUser = {
  countSponsoring: Scalars['Int']['output'];
  countSponsors: Scalars['Int']['output'];
  isMaker: Scalars['Boolean']['output'];
  isMember: Scalars['Boolean']['output'];
  isSubscriber: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  platformType: PlatformType;
  sessionUser?: Maybe<SessionUserUserData>;
  status: UserStatus;
  userType: UserType;
};

export type RootMaker = {
  isMaker: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  platformType: PlatformType;
  sessionUser?: Maybe<SessionUserUserData>;
  sponsorships: SponsorshipSet;
  status: UserStatus;
  userType: UserType;
};

export type RootQueryType = {
  search: RootSearch;
  sessionMaker?: Maybe<RootMaker>;
  sessionUser?: Maybe<RootUser>;
  user: PublicUser;
  /** Get the current News API version */
  version: Scalars['String']['output'];
};


export type RootQueryTypeUserArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type RootSearch = {
  makers: UserSet;
};

export type RootUser = {
  countSponsoring: Scalars['Int']['output'];
  countSponsors: Scalars['Int']['output'];
  email?: Maybe<Scalars['String']['output']>;
  isMaker: Scalars['Boolean']['output'];
  isMember: Scalars['Boolean']['output'];
  isStaff: Scalars['Boolean']['output'];
  isSubscriber: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  platformType: PlatformType;
  privacy: UserPrivacy;
  sessionUser?: Maybe<SessionUserUserData>;
  sponsorships: SponsorshipSet;
  status: UserStatus;
  subscription?: Maybe<SubRef>;
  userType: UserType;
};

export type SessionUserUserData = {
  followed: Scalars['Boolean']['output'];
  sponsored: Scalars['Boolean']['output'];
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

export type SponsorshipSet = {
  items: Array<Sponsorship>;
  next?: Maybe<Scalars['String']['output']>;
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

export enum UserPrivacy {
  ANONYMOUS = 'ANONYMOUS',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export type UserRef = {
  isMaker: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  platformType: PlatformType;
  sessionUser?: Maybe<SessionUserUserData>;
  status: UserStatus;
  userType: UserType;
};

export type UserSet = {
  items: Array<UserRef>;
  next?: Maybe<Scalars['String']['output']>;
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


export type GetDashboardQueryResult = { sessionUser?: { sponsorships: { items: Array<{ status: SubscriptionStatus, anonymous: boolean, insertedAt: any, maker?: { name: string } | null }> }, subscription?: { amt: number, status: SubscriptionStatus, insertedAt: any } | null } | null, sessionMaker?: { sponsorships: { items: Array<{ insertedAt: any, sponsor?: { name: string } | null }> } } | null };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQueryResult = { sessionUser?: { name: string, email?: string | null, phone?: string | null, privacy: UserPrivacy, status: UserStatus, userType: UserType, isStaff: boolean } | null };

export type GetUserQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;


export type GetUserQueryResult = { user: { name: string, isMember: boolean, isMaker: boolean, countSponsoring: number, countSponsors: number, sessionUser?: { sponsored: boolean } | null } };


export const GetDashboardDocument = gql`
    query GetDashboard {
  sessionUser {
    sponsorships {
      items {
        status
        anonymous
        insertedAt
        maker {
          name
        }
      }
    }
    subscription {
      amt
      status
      insertedAt
    }
  }
  sessionMaker {
    sponsorships {
      items {
        insertedAt
        sponsor {
          name
        }
      }
    }
  }
}
    `;
export const GetProfileDocument = gql`
    query GetProfile {
  sessionUser {
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
export const GetUserDocument = gql`
    query GetUser($user: String!) {
  user(name: $user) {
    name
    isMember
    isMaker
    countSponsoring
    countSponsors
    sessionUser {
      sponsored
    }
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
    },
    GetUser(variables: GetUserQueryVariables, options?: C): Promise<GetUserQueryResult> {
      return requester<GetUserQueryResult, GetUserQueryVariables>(GetUserDocument, variables, options) as Promise<GetUserQueryResult>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;