import { createAuthLink, AuthOptions } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

import appSyncConfig from "./aws-exports";

const url: string = appSyncConfig.aws_appsync_graphqlEndpoint;
const region: string = appSyncConfig.aws_appsync_region;


const auth: AuthOptions = {
  type: appSyncConfig.aws_appsync_authenticationType as "API_KEY", 
  apiKey: appSyncConfig.aws_appsync_apiKey || "",
};


const httpLink = new HttpLink({ uri: url });
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);



const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

type ApolloWrapperProps = {
  children: React.ReactNode;
};

const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
