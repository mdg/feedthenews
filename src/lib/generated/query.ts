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

export enum AcctStatus {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN'
}

export enum AcctType {
  PAYOUT = 'PAYOUT',
  SPEND = 'SPEND'
}

export enum PlatformType {
  ACTIVITYPUB = 'ACTIVITYPUB',
  ATPROTO = 'ATPROTO',
  FEEDTHENEWS = 'FEEDTHENEWS',
  PODCAST = 'PODCAST',
  WEBSITE = 'WEBSITE',
  YOUTUBE = 'YOUTUBE'
}

export type PublicUser = {
  avatar?: Maybe<Scalars['String']['output']>;
  countSponsoring: Scalars['Int']['output'];
  countSponsors: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  did?: Maybe<Scalars['String']['output']>;
  isMaker: Scalars['Boolean']['output'];
  isSubscriber: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  patreon?: Maybe<Scalars['String']['output']>;
  platformType: PlatformType;
  sessionUserSponsorship?: Maybe<SessionUserSponsorship>;
  sponsorOfSessionMaker?: Maybe<SessionUserSponsorship>;
  status: UserStatus;
  userType: UserType;
};

export type RootQueryType = {
  search: RootSearch;
  sessionMaker?: Maybe<SessionMaker>;
  sessionUser?: Maybe<SessionUser>;
  user: PublicUser;
  /** Get the current News API version */
  version: Scalars['String']['output'];
};


export type RootQueryTypeUserArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type RootSearch = {
  makers: UserSet;
  topics: TopicSet;
};

export type SessionMaker = {
  avatar?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  did?: Maybe<Scalars['String']['output']>;
  isMaker: Scalars['Boolean']['output'];
  isSubscriber: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  patreon?: Maybe<Scalars['String']['output']>;
  payoutAcct?: Maybe<UserAcct>;
  platformType: PlatformType;
  sessionUserSponsorship?: Maybe<SessionUserSponsorship>;
  sponsorOfSessionMaker?: Maybe<SessionUserSponsorship>;
  sponsors: UserSet;
  status: UserStatus;
  userType: UserType;
};

export type SessionUser = {
  avatar?: Maybe<Scalars['String']['output']>;
  countSponsoring: Scalars['Int']['output'];
  countSponsors: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  did?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  grantAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  isMaker: Scalars['Boolean']['output'];
  isStaff: Scalars['Boolean']['output'];
  isStripeCustomer?: Maybe<Scalars['Boolean']['output']>;
  isSubscriber: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  patreon?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  platformType: PlatformType;
  privacy: UserPrivacy;
  sessionUserSponsorship?: Maybe<SessionUserSponsorship>;
  spendAcct?: Maybe<UserAcct>;
  sponsorOfSessionMaker?: Maybe<SessionUserSponsorship>;
  sponsoredMakers: UserSet;
  status: UserStatus;
  subscription?: Maybe<UserSub>;
  topics: Array<Maybe<UserTopic>>;
  userType: UserType;
};


export type SessionUserSubscriptionArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SessionUserSponsorship = {
  anonymous: Scalars['Boolean']['output'];
  matching: Scalars['Boolean']['output'];
  status: SponsorshipStatus;
  statusAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export enum SponsorshipStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  CANCELLED = 'CANCELLED',
  PAUSED = 'PAUSED'
}

export type Stmt = {
  balance: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
  insertedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  month: Scalars['Int']['output'];
  openingBalance: Scalars['Int']['output'];
  prevStmtId?: Maybe<Scalars['String']['output']>;
  transactions: UserTxSet;
  year: Scalars['Int']['output'];
};

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  PAUSED = 'PAUSED',
  PENDING = 'PENDING'
}

export type TopicRef = {
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type TopicSet = {
  items: Array<TopicRef>;
  next?: Maybe<Scalars['String']['output']>;
};

export enum TxStatus {
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  POSTED = 'POSTED'
}

export enum TxType {
  FUNDING = 'FUNDING',
  GRANT = 'GRANT',
  PAYOUT = 'PAYOUT'
}

export type UserAcct = {
  acctType: AcctType;
  current?: Maybe<Stmt>;
  lastStmt?: Maybe<Stmt>;
  name: Scalars['String']['output'];
  status: AcctStatus;
  statusAt: Scalars['NaiveDateTime']['output'];
  stmt?: Maybe<Stmt>;
};


export type UserAcctStmtArgs = {
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export enum UserPrivacy {
  ANONYMOUS = 'ANONYMOUS',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export type UserRef = {
  avatar?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  did?: Maybe<Scalars['String']['output']>;
  isMaker: Scalars['Boolean']['output'];
  isSubscriber: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  patreon?: Maybe<Scalars['String']['output']>;
  platformType: PlatformType;
  sessionUserSponsorship?: Maybe<SessionUserSponsorship>;
  sponsorOfSessionMaker?: Maybe<SessionUserSponsorship>;
  status: UserStatus;
  userType: UserType;
};

export type UserSet = {
  items: Array<UserRef>;
  next?: Maybe<Scalars['String']['output']>;
  numAnonymous?: Maybe<Scalars['Int']['output']>;
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export type UserSub = {
  amt: Scalars['Int']['output'];
  checkoutUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  insertedAt: Scalars['NaiveDateTime']['output'];
  status: SubscriptionStatus;
  statusAt: Scalars['NaiveDateTime']['output'];
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  stripeUrl?: Maybe<Scalars['String']['output']>;
  transactions: UserTxSet;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type UserTopic = {
  asMaker: Scalars['Boolean']['output'];
  asSponsor: Scalars['Boolean']['output'];
  privacy: UserPrivacy;
  topic: TopicRef;
};

export type UserTx = {
  amt: Scalars['Int']['output'];
  anonymous: Scalars['Boolean']['output'];
  desc: Scalars['String']['output'];
  insertedAt: Scalars['NaiveDateTime']['output'];
  invoiceId?: Maybe<Scalars['String']['output']>;
  otherUser?: Maybe<UserRef>;
  statusAt: Scalars['NaiveDateTime']['output'];
  txStatus: TxStatus;
  txType: TxType;
};

export type UserTxSet = {
  items: Array<UserTx>;
  next?: Maybe<Scalars['String']['output']>;
};

export enum UserType {
  ALT = 'ALT',
  IMPORT = 'IMPORT',
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export type GetDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardQueryResult = { sessionUser?: { sponsoredMakers: { items: Array<{ name: string }> }, subscription?: { amt: number, status: SubscriptionStatus, insertedAt: any } | null } | null, sessionMaker?: { sponsors: { items: Array<{ name: string }> } } | null };

export type GetDiscoverQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDiscoverQueryResult = { search: { topics: { items: Array<{ name: string, slug: string }> }, makers: { items: Array<{ name: string, platformType: PlatformType, avatar?: string | null, sessionUserSponsorship?: { status: SponsorshipStatus } | null }> } } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQueryResult = { sessionUser?: { name: string, email?: string | null, phone?: string | null, privacy: UserPrivacy, status: UserStatus, userType: UserType, isStaff: boolean } | null };

export type GetSponsorshipsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSponsorshipsQueryResult = { sessionUser?: { grantAt?: any | null, spendAcct?: { current?: { balance: number } | null } | null, sponsoredMakers: { next?: string | null, items: Array<{ name: string, platformType: PlatformType, avatar?: string | null, sessionUserSponsorship?: { status: SponsorshipStatus, statusAt?: any | null, anonymous: boolean, matching: boolean } | null }> } } | null };

export type GetSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubscriptionQueryResult = { sessionUser?: { isStripeCustomer?: boolean | null, subscription?: { amt: number, status: SubscriptionStatus, insertedAt: any, statusAt: any, checkoutUrl?: string | null, transactions: { items: Array<{ amt: number, anonymous: boolean, desc: string, insertedAt: any, statusAt: any, txStatus: TxStatus, txType: TxType }> } } | null } | null };

export type GetUserQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;


export type GetUserQueryResult = { user: { name: string, isMaker: boolean, patreon?: string | null, countSponsoring: number, countSponsors: number, avatar?: string | null, description?: string | null, platformType: PlatformType, sessionUserSponsorship?: { status: SponsorshipStatus } | null } };


export const GetDashboardDocument = gql`
    query GetDashboard {
  sessionUser {
    sponsoredMakers {
      items {
        name
      }
    }
    subscription {
      amt
      status
      insertedAt
    }
  }
  sessionMaker {
    sponsors {
      items {
        name
      }
    }
  }
}
    `;
export const GetDiscoverDocument = gql`
    query GetDiscover {
  search {
    topics {
      items {
        name
        slug
      }
    }
    makers {
      items {
        name
        platformType
        avatar
        sessionUserSponsorship {
          status
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
export const GetSponsorshipsDocument = gql`
    query GetSponsorships {
  sessionUser {
    grantAt
    spendAcct {
      current {
        balance
      }
    }
    sponsoredMakers {
      items {
        name
        platformType
        avatar
        sessionUserSponsorship {
          status
          statusAt
          anonymous
          matching
        }
      }
      next
    }
  }
}
    `;
export const GetSubscriptionDocument = gql`
    query GetSubscription {
  sessionUser {
    isStripeCustomer
    subscription(includeInactive: true) {
      amt
      status
      insertedAt
      statusAt
      checkoutUrl
      transactions {
        items {
          amt
          anonymous
          desc
          insertedAt
          statusAt
          txStatus
          txType
        }
      }
    }
  }
}
    `;
export const GetUserDocument = gql`
    query GetUser($user: String!) {
  user(name: $user) {
    name
    isMaker
    patreon
    countSponsoring
    countSponsors
    avatar
    description
    platformType
    sessionUserSponsorship {
      status
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
    GetDiscover(variables?: GetDiscoverQueryVariables, options?: C): Promise<GetDiscoverQueryResult> {
      return requester<GetDiscoverQueryResult, GetDiscoverQueryVariables>(GetDiscoverDocument, variables, options) as Promise<GetDiscoverQueryResult>;
    },
    GetProfile(variables?: GetProfileQueryVariables, options?: C): Promise<GetProfileQueryResult> {
      return requester<GetProfileQueryResult, GetProfileQueryVariables>(GetProfileDocument, variables, options) as Promise<GetProfileQueryResult>;
    },
    GetSponsorships(variables?: GetSponsorshipsQueryVariables, options?: C): Promise<GetSponsorshipsQueryResult> {
      return requester<GetSponsorshipsQueryResult, GetSponsorshipsQueryVariables>(GetSponsorshipsDocument, variables, options) as Promise<GetSponsorshipsQueryResult>;
    },
    GetSubscription(variables?: GetSubscriptionQueryVariables, options?: C): Promise<GetSubscriptionQueryResult> {
      return requester<GetSubscriptionQueryResult, GetSubscriptionQueryVariables>(GetSubscriptionDocument, variables, options) as Promise<GetSubscriptionQueryResult>;
    },
    GetUser(variables: GetUserQueryVariables, options?: C): Promise<GetUserQueryResult> {
      return requester<GetUserQueryResult, GetUserQueryVariables>(GetUserDocument, variables, options) as Promise<GetUserQueryResult>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;