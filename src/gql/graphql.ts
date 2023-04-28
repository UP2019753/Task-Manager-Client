/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A simple DateTime parser */
  DateTime: string;
  /** A simple Duration parser */
  Duration: string;
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['Int'];
  name: Scalars['String'];
  tasks: Array<Task>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createTask: Task;
  deleteTask: Scalars['Boolean'];
  setBoardName: Board;
  setTaskName: Task;
  setTaskStatus: Task;
  startTimePeriod: TimePeriod;
  stopTimePeriod: Task;
};


export type MutationCreateBoardArgs = {
  name: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  boardId: Scalars['Int'];
  name: Scalars['String'];
  taskProgress?: InputMaybe<TaskProgress>;
};


export type MutationDeleteTaskArgs = {
  taskID: Scalars['Int'];
};


export type MutationSetBoardNameArgs = {
  boardId: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationSetTaskNameArgs = {
  name: Scalars['String'];
  taskId: Scalars['Int'];
};


export type MutationSetTaskStatusArgs = {
  status: TaskProgress;
  taskID: Scalars['Int'];
};


export type MutationStartTimePeriodArgs = {
  taskID: Scalars['Int'];
};


export type MutationStopTimePeriodArgs = {
  taskID: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getBoardById: Board;
  getBoardsByIds: Array<Board>;
};


export type QueryGetBoardByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetBoardsByIdsArgs = {
  ids: Array<Scalars['Int']>;
};

export type RealTimeDuration = {
  __typename?: 'RealTimeDuration';
  startTimes: Array<Scalars['DateTime']>;
  totalSavedTime: Scalars['Duration'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  isRunning: Scalars['Boolean'];
  name: Scalars['String'];
  status: TaskProgress;
  timePeriods: Array<TimePeriod>;
  totalTime: RealTimeDuration;
};

export enum TaskProgress {
  Done = 'DONE',
  Inprogress = 'INPROGRESS',
  Notstarted = 'NOTSTARTED'
}

export type TimePeriod = {
  __typename?: 'TimePeriod';
  id: Scalars['Int'];
  startTime: Scalars['DateTime'];
  stopTime?: Maybe<Scalars['DateTime']>;
  task: Task;
};

export type SetBoardNameMutationMutationVariables = Exact<{
  boardId: Scalars['Int'];
  name: Scalars['String'];
}>;


export type SetBoardNameMutationMutation = { __typename?: 'Mutation', setBoardName: { __typename?: 'Board', id: number } };

export type StartTaskMutationMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type StartTaskMutationMutation = { __typename?: 'Mutation', startTimePeriod: { __typename?: 'TimePeriod', id: number } };

export type StopTaskMutationMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type StopTaskMutationMutation = { __typename?: 'Mutation', stopTimePeriod: { __typename?: 'Task', id: number } };

export type DeleteTaskMutationMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type DeleteTaskMutationMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type SetTaskNameMutationMutationVariables = Exact<{
  taskId: Scalars['Int'];
  name: Scalars['String'];
}>;


export type SetTaskNameMutationMutation = { __typename?: 'Mutation', setTaskName: { __typename?: 'Task', id: number } };

export type CreateTaskMutationVariables = Exact<{
  id: Scalars['Int'];
  status?: InputMaybe<TaskProgress>;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: number } };

export type BoardSummaryFragment = { __typename?: 'Board', id: number, name: string } & { ' $fragmentName'?: 'BoardSummaryFragment' };

export type RealTimeDurationItemFragment = { __typename?: 'RealTimeDuration', totalSavedTime: string, startTimes: Array<string> } & { ' $fragmentName'?: 'RealTimeDurationItemFragment' };

export type TaskItemFragment = { __typename?: 'Task', id: number, name: string, isRunning: boolean, status: TaskProgress, totalTime: (
    { __typename?: 'RealTimeDuration' }
    & { ' $fragmentRefs'?: { 'RealTimeDurationItemFragment': RealTimeDurationItemFragment } }
  ) } & { ' $fragmentName'?: 'TaskItemFragment' };

export type GetBoardByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetBoardByIdQuery = { __typename?: 'Query', getBoardById: { __typename?: 'Board', tasks: Array<(
      { __typename?: 'Task' }
      & { ' $fragmentRefs'?: { 'TaskItemFragment': TaskItemFragment } }
    )> } };

export type SetTaskStatusMutationMutationVariables = Exact<{
  taskId: Scalars['Int'];
  status: TaskProgress;
}>;


export type SetTaskStatusMutationMutation = { __typename?: 'Mutation', setTaskStatus: { __typename?: 'Task', id: number } };

export type GetBoardsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type GetBoardsByIdsQuery = { __typename?: 'Query', getBoardsByIds: Array<(
    { __typename?: 'Board' }
    & { ' $fragmentRefs'?: { 'BoardSummaryFragment': BoardSummaryFragment } }
  )> };

export type CreateBoardMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', id: number } };

export const BoardSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<BoardSummaryFragment, unknown>;
export const RealTimeDurationItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RealTimeDurationItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RealTimeDuration"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSavedTime"}},{"kind":"Field","name":{"kind":"Name","value":"startTimes"}}]}}]} as unknown as DocumentNode<RealTimeDurationItemFragment, unknown>;
export const TaskItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RealTimeDurationItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RealTimeDurationItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RealTimeDuration"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSavedTime"}},{"kind":"Field","name":{"kind":"Name","value":"startTimes"}}]}}]} as unknown as DocumentNode<TaskItemFragment, unknown>;
export const SetBoardNameMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setBoardNameMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setBoardName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SetBoardNameMutationMutation, SetBoardNameMutationMutationVariables>;
export const StartTaskMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startTaskMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTimePeriod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StartTaskMutationMutation, StartTaskMutationMutationVariables>;
export const StopTaskMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopTaskMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopTimePeriod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StopTaskMutationMutation, StopTaskMutationMutationVariables>;
export const DeleteTaskMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTaskMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}]}]}}]} as unknown as DocumentNode<DeleteTaskMutationMutation, DeleteTaskMutationMutationVariables>;
export const SetTaskNameMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setTaskNameMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTaskName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SetTaskNameMutationMutation, SetTaskNameMutationMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskProgress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"New Task","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"taskProgress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const GetBoardByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBoardById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBoardById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RealTimeDurationItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RealTimeDuration"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSavedTime"}},{"kind":"Field","name":{"kind":"Name","value":"startTimes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RealTimeDurationItem"}}]}}]}}]} as unknown as DocumentNode<GetBoardByIdQuery, GetBoardByIdQueryVariables>;
export const SetTaskStatusMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setTaskStatusMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskProgress"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTaskStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SetTaskStatusMutationMutation, SetTaskStatusMutationMutationVariables>;
export const GetBoardsByIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBoardsByIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBoardsByIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardSummary"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetBoardsByIdsQuery, GetBoardsByIdsQueryVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;