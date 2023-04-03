import { graphql } from "../gql";

export const RealTimeDurationFragment = graphql(`
  fragment RealTimeDurationItem on RealTimeDuration {
    totalSavedTime
    startTimes
  }
`);
