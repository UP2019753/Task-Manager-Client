import { graphql } from "../gql";

export const BoardSummaryFragment = graphql(`
  fragment BoardSummary on Board {
    id
    name
  }
`);
