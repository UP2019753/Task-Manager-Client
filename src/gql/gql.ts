/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation setBoardNameMutation($boardId: Int!, $name: String!) {\n    setBoardName(boardId: $boardId, name: $name) {\n      id\n    }\n  }\n": types.SetBoardNameMutationDocument,
    "\n  mutation startTaskMutation($taskId: Int!) {\n    startTimePeriod(taskID: $taskId) {\n      id\n    }\n  }\n": types.StartTaskMutationDocument,
    "\n  mutation stopTaskMutation($taskId: Int!) {\n    stopTimePeriod(taskID: $taskId) {\n      id\n    }\n  }\n": types.StopTaskMutationDocument,
    "\n  mutation deleteTaskMutation($taskId: Int!) {\n    deleteTask(taskID: $taskId)\n  }\n": types.DeleteTaskMutationDocument,
    "\n  mutation setTaskNameMutation($taskId: Int!, $name: String!) {\n    setTaskName(taskId: $taskId, name: $name) {\n      id\n    }\n  }\n": types.SetTaskNameMutationDocument,
    "\n  mutation createTask($id: Int!, $status: TaskProgress) {\n    createTask(boardId: $id, name: \"New Task\", taskProgress: $status) {\n      id\n    }\n  }\n": types.CreateTaskDocument,
    "\n  fragment BoardSummary on Board {\n    id\n    name\n  }\n": types.BoardSummaryFragmentDoc,
    "\n  fragment RealTimeDurationItem on RealTimeDuration {\n    totalSavedTime\n    startTimes\n  }\n": types.RealTimeDurationItemFragmentDoc,
    "\n  fragment TaskItem on Task {\n    id\n    name\n    isRunning\n    status\n    totalTime {\n      ...RealTimeDurationItem\n    }\n  }\n": types.TaskItemFragmentDoc,
    "\n  query getBoardById($id: Int!) {\n    getBoardById(id: $id) {\n      tasks {\n        ...TaskItem\n      }\n    }\n  }\n": types.GetBoardByIdDocument,
    "\n  mutation setTaskStatusMutation($taskId: Int!, $status: TaskProgress!) {\n    setTaskStatus(taskID: $taskId, status: $status) {\n      id\n    }\n  }\n": types.SetTaskStatusMutationDocument,
    "\n  query getBoardsByIds($ids: [Int!]!) {\n    getBoardsByIds(ids: $ids) {\n      ...BoardSummary\n    }\n  }\n": types.GetBoardsByIdsDocument,
    "\n  mutation createBoard($name: String!) {\n    createBoard(name: $name) {\n      id\n    }\n  }\n": types.CreateBoardDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation setBoardNameMutation($boardId: Int!, $name: String!) {\n    setBoardName(boardId: $boardId, name: $name) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation setBoardNameMutation($boardId: Int!, $name: String!) {\n    setBoardName(boardId: $boardId, name: $name) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation startTaskMutation($taskId: Int!) {\n    startTimePeriod(taskID: $taskId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation startTaskMutation($taskId: Int!) {\n    startTimePeriod(taskID: $taskId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation stopTaskMutation($taskId: Int!) {\n    stopTimePeriod(taskID: $taskId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation stopTaskMutation($taskId: Int!) {\n    stopTimePeriod(taskID: $taskId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTaskMutation($taskId: Int!) {\n    deleteTask(taskID: $taskId)\n  }\n"): (typeof documents)["\n  mutation deleteTaskMutation($taskId: Int!) {\n    deleteTask(taskID: $taskId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation setTaskNameMutation($taskId: Int!, $name: String!) {\n    setTaskName(taskId: $taskId, name: $name) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation setTaskNameMutation($taskId: Int!, $name: String!) {\n    setTaskName(taskId: $taskId, name: $name) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTask($id: Int!, $status: TaskProgress) {\n    createTask(boardId: $id, name: \"New Task\", taskProgress: $status) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createTask($id: Int!, $status: TaskProgress) {\n    createTask(boardId: $id, name: \"New Task\", taskProgress: $status) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BoardSummary on Board {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment BoardSummary on Board {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RealTimeDurationItem on RealTimeDuration {\n    totalSavedTime\n    startTimes\n  }\n"): (typeof documents)["\n  fragment RealTimeDurationItem on RealTimeDuration {\n    totalSavedTime\n    startTimes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskItem on Task {\n    id\n    name\n    isRunning\n    status\n    totalTime {\n      ...RealTimeDurationItem\n    }\n  }\n"): (typeof documents)["\n  fragment TaskItem on Task {\n    id\n    name\n    isRunning\n    status\n    totalTime {\n      ...RealTimeDurationItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBoardById($id: Int!) {\n    getBoardById(id: $id) {\n      tasks {\n        ...TaskItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query getBoardById($id: Int!) {\n    getBoardById(id: $id) {\n      tasks {\n        ...TaskItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation setTaskStatusMutation($taskId: Int!, $status: TaskProgress!) {\n    setTaskStatus(taskID: $taskId, status: $status) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation setTaskStatusMutation($taskId: Int!, $status: TaskProgress!) {\n    setTaskStatus(taskID: $taskId, status: $status) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBoardsByIds($ids: [Int!]!) {\n    getBoardsByIds(ids: $ids) {\n      ...BoardSummary\n    }\n  }\n"): (typeof documents)["\n  query getBoardsByIds($ids: [Int!]!) {\n    getBoardsByIds(ids: $ids) {\n      ...BoardSummary\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($name: String!) {\n    createBoard(name: $name) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($name: String!) {\n    createBoard(name: $name) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;