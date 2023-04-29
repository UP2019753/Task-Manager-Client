import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(import.meta.env.API_URL);
