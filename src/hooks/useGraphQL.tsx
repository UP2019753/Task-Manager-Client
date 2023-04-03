import request from "graphql-request";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

// Taken from https://the-guild.dev/graphql/codegen/docs/guides/react-vue#writing-graphql-queries
export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery(
    [(document.definitions[0] as any).name.value, variables],
    async ({ queryKey }) =>
      request(
        "http://localhost:3000/graphql",
        document,
        queryKey[1] ? queryKey[1] : undefined
      )
  );
}
