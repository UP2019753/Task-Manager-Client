import { useDraggable } from "@dnd-kit/core";
import { Button, Card, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { queryClient } from "../App";
import { TaskFragment } from "../fragments/taskFragment";
import { FragmentType, graphql, useFragment } from "../gql";
import { useGraphQL } from "../hooks/useGraphQL";
import { graphQLClient } from "../utils/request";
import { RealTimeDuration } from "./RealTimeDuration";
import { CSS } from "@dnd-kit/utilities";
import { AddBox, Delete } from "@mui/icons-material";

export interface TaskProps {
  task: FragmentType<typeof TaskFragment>;
}

const startTaskMutation = graphql(`
  mutation startTaskMutation($taskId: Int!) {
    startTimePeriod(taskID: $taskId) {
      id
    }
  }
`);

const stopTaskMutation = graphql(`
  mutation stopTaskMutation($taskId: Int!) {
    stopTimePeriod(taskID: $taskId) {
      id
    }
  }
`);

const deleteTaskMutation = graphql(`
  mutation deleteTaskMutation($taskId: Int!) {
    deleteTask(taskID: $taskId)
  }
`);

export const Task: FC<TaskProps> = (props) => {
  const task = useFragment(TaskFragment, props.task);
  const { mutate: startMutate } = useMutation({
    mutationFn: async () =>
      graphQLClient.request(startTaskMutation, { taskId: task.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  const { mutate: stopMutate } = useMutation({
    mutationFn: async () =>
      graphQLClient.request(stopTaskMutation, { taskId: task.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async () =>
      graphQLClient.request(deleteTaskMutation, { taskId: task.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const { setNodeRef, transform, listeners } = useDraggable({
    id: `task-${task.id}`,
    data: {
      type: "task",
      id: task.id,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      sx={{ transform: CSS.Translate.toString(transform) }}
      {...listeners}
    >
      <Grid2 container direction="column">
        <Grid2 container>
          <Grid2 container xs>
            <Grid2>
              <Typography variant="body1">{task.name}</Typography>
            </Grid2>
            <Grid2>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  deleteMutate();
                }}
                size="small"
              >
                <Delete></Delete>
              </IconButton>
            </Grid2>
          </Grid2>

          <Grid2 xs="auto">
            <Typography variant="body1">
              <RealTimeDuration time={task.totalTime} />
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container>
          <Grid2 xs></Grid2>
          <Grid2 xs="auto">
            <Button
              variant="text"
              onClick={() => {
                task.isRunning ? stopMutate() : startMutate();
              }}
            >
              {task.isRunning ? "Stop" : "Start"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Card>
  );
};
