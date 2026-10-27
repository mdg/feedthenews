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
  sessionUser: SessionUserMut;
};

export type RootQueryType = {
  zero: Scalars['Int']['output'];
};

export type SessionUserMut = {
  cancelSponsorship: UserRef;
  cancelSubscription?: Maybe<SubRef>;
  setIsMaker: Scalars['Boolean']['output'];
  setName: Scalars['String']['output'];
  sponsor: UserRef;
  stripeSession?: Maybe<Scalars['String']['output']>;
  subscribe: SubRef;
  topic?: Maybe<UserTopic>;
};


export type SessionUserMutCancelSponsorshipArgs = {
  maker: Scalars['String']['input'];
};


export type SessionUserMutSetIsMakerArgs = {
  isMaker?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SessionUserMutSetNameArgs = {
  newName: Scalars['String']['input'];
};


export type SessionUserMutSponsorArgs = {
  anonymous?: InputMaybe<Scalars['Boolean']['input']>;
  maker: Scalars['String']['input'];
};


export type SessionUserMutSubscribeArgs = {
  amtCents: Scalars['Int']['input'];
};


export type SessionUserMutTopicArgs = {
  asMaker?: InputMaybe<Scalars['Boolean']['input']>;
  asSponsor?: InputMaybe<Scalars['Boolean']['input']>;
  privacy?: InputMaybe<UserPrivacy>;
  topicSlug: Scalars['String']['input'];
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

export type SubRef = {
  amt: Scalars['Int']['output'];
  checkoutUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  insertedAt: Scalars['NaiveDateTime']['output'];
  status: SubscriptionStatus;
  statusAt: Scalars['NaiveDateTime']['output'];
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  stripeUrl?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
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

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export type UserTopic = {
  asMaker: Scalars['Boolean']['output'];
  asSponsor: Scalars['Boolean']['output'];
  privacy: UserPrivacy;
  topic: TopicRef;
};

export enum UserType {
  ALT = 'ALT',
  IMPORT = 'IMPORT',
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export type CancelSponsorshipMutationVariables = Exact<{
  maker: Scalars['String']['input'];
}>;


export type CancelSponsorshipMutationResult = { sessionUser: { cancelSponsorship: { status: UserStatus } } };

export type CancelSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelSubscriptionMutationResult = { sessionUser: { cancelSubscription?: { status: SubscriptionStatus } | null } };

export type SetUserNameMutationVariables = Exact<{
  newName: Scalars['String']['input'];
}>;


export type SetUserNameMutationResult = { sessionUser: { setName: string } };

export type SponsorMutationVariables = Exact<{
  maker: Scalars['String']['input'];
}>;


export type SponsorMutationResult = { sessionUser: { sponsor: { status: UserStatus } } };

export type StripeSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type StripeSessionMutationResult = { sessionUser: { stripeSession?: string | null } };

export type SubscribeMutationVariables = Exact<{
  amtCents: Scalars['Int']['input'];
}>;


export type SubscribeMutationResult = { sessionUser: { subscribe: { status: SubscriptionStatus, checkoutUrl?: string | null } } };


export const CancelSponsorshipDocument = gql`
    mutation CancelSponsorship($maker: String!) {
  sessionUser {
    cancelSponsorship(maker: $maker) {
      status
    }
  }
}
    `;
export const CancelSubscriptionDocument = gql`
    mutation CancelSubscription {
  sessionUser {
    cancelSubscription {
      status
    }
  }
}
    `;
export const SetUserNameDocument = gql`
    mutation SetUserName($newName: String!) {
  sessionUser {
    setName(newName: $newName)
  }
}
    `;
export const SponsorDocument = gql`
    mutation Sponsor($maker: String!) {
  sessionUser {
    sponsor(maker: $maker) {
      status
    }
  }
}
    `;
export const StripeSessionDocument = gql`
    mutation StripeSession {
  sessionUser {
    stripeSession
  }
}
    `;
export const SubscribeDocument = gql`
    mutation Subscribe($amtCents: Int!) {
  sessionUser {
    subscribe(amtCents: $amtCents) {
      status
      checkoutUrl
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    CancelSponsorship(variables: CancelSponsorshipMutationVariables, options?: C): Promise<CancelSponsorshipMutationResult> {
      return requester<CancelSponsorshipMutationResult, CancelSponsorshipMutationVariables>(CancelSponsorshipDocument, variables, options) as Promise<CancelSponsorshipMutationResult>;
    },
    CancelSubscription(variables?: CancelSubscriptionMutationVariables, options?: C): Promise<CancelSubscriptionMutationResult> {
      return requester<CancelSubscriptionMutationResult, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, variables, options) as Promise<CancelSubscriptionMutationResult>;
    },
    SetUserName(variables: SetUserNameMutationVariables, options?: C): Promise<SetUserNameMutationResult> {
      return requester<SetUserNameMutationResult, SetUserNameMutationVariables>(SetUserNameDocument, variables, options) as Promise<SetUserNameMutationResult>;
    },
    Sponsor(variables: SponsorMutationVariables, options?: C): Promise<SponsorMutationResult> {
      return requester<SponsorMutationResult, SponsorMutationVariables>(SponsorDocument, variables, options) as Promise<SponsorMutationResult>;
    },
    StripeSession(variables?: StripeSessionMutationVariables, options?: C): Promise<StripeSessionMutationResult> {
      return requester<StripeSessionMutationResult, StripeSessionMutationVariables>(StripeSessionDocument, variables, options) as Promise<StripeSessionMutationResult>;
    },
    Subscribe(variables: SubscribeMutationVariables, options?: C): Promise<SubscribeMutationResult> {
      return requester<SubscribeMutationResult, SubscribeMutationVariables>(SubscribeDocument, variables, options) as Promise<SubscribeMutationResult>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;