import { graphql } from "../gql";

export const TaskFragment = graphql(`
  fragment TaskItem on Task {
    id
    name
    isRunning
    status
    totalTime {
      ...RealTimeDurationItem
    }
  }
`);
