import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { AddBox } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import { queryClient } from "../App";
import { Task } from "../components/Task";
import { TaskStatus } from "../components/TaskStatus";
import { TaskFragment } from "../fragments/taskFragment";
import { graphql, useFragment } from "../gql";
import { TaskProgress } from "../gql/graphql";
import { graphQLClient } from "../utils/request";

const boardByIdQueryDocument = graphql(`
  query getBoardById($id: Int!) {
    getBoardById(id: $id) {
      tasks {
        ...TaskItem
      }
    }
  }
`);

const columns: TaskProgress[] = [
  TaskProgress.Notstarted,
  TaskProgress.Inprogress,
  TaskProgress.Done,
];

const setTaskStatusMutation = graphql(`
  mutation setTaskStatusMutation($taskId: Int!, $status: TaskProgress!) {
    setTaskStatus(taskID: $taskId, status: $status) {
      id
    }
  }
`);

export const BoardPage: FC = () => {
  const { boardId } = useParams();

  const boardIdParsed = boardId && +boardId;

  if (!boardIdParsed) {
    throw new Error("boardId missing");
  }

  const { data } = useQuery({
    queryKey: ["boards"],
    queryFn: async () =>
      graphQLClient.request(boardByIdQueryDocument, {
        id: boardIdParsed,
      }),
  });

  const { mutate: setStatusMutate } = useMutation({
    mutationFn: async (args: { taskId: number; status: TaskProgress }) =>
      graphQLClient.request(setTaskStatusMutation, args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  const onDrop = useCallback(({ active, over }: DragEndEvent) => {
    console.log(active, over);
    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "taskColumn"
    ) {
      const taskId = (active.data.current as unknown as { id: number }).id;
      const status = (over.data.current as unknown as { status: TaskProgress })
        .status;
      setStatusMutate({ taskId, status });
    }
  }, []);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  if (!data) {
    return <CircularProgress />;
  }

  return (
    <DndContext onDragEnd={onDrop} sensors={sensors}>
      <Grid2 container spacing={2}>
        {columns.map((status) => {
          const tasks = data.getBoardById.tasks.filter((task) => {
            const fragmentData = useFragment(TaskFragment, task);
            return fragmentData.status === status;
          });
          return (
            <TaskStatus
              boardId={boardIdParsed}
              status={status}
              tasks={tasks}
              key={status}
            />
          );
        })}
      </Grid2>
    </DndContext>
  );
};
