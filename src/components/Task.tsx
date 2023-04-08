import { useDraggable } from "@dnd-kit/core";
import {
  Button,
  Card,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { queryClient } from "../App";
import { TaskFragment } from "../fragments/taskFragment";
import { FragmentType, graphql, useFragment } from "../gql";
import { useGraphQL } from "../hooks/useGraphQL";
import { graphQLClient } from "../utils/request";
import { RealTimeDuration } from "./RealTimeDuration";
import { CSS } from "@dnd-kit/utilities";
import { AddBox, Delete, Edit, Save } from "@mui/icons-material";

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

const setTaskNameMutation = graphql(`
  mutation setTaskNameMutation($taskId: Int!, $name: String!) {
    setTaskName(taskId: $taskId, name: $name) {
      id
    }
  }
`);

export const Task: FC<TaskProps> = (props) => {
  const task = useFragment(TaskFragment, props.task);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newName, setNewName] = useState(task.name);
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

  const { mutate: setTaskNameMutate } = useMutation({
    mutationFn: async ({ name }: { name: string }) =>
      graphQLClient.request(setTaskNameMutation, {
        taskId: task.id,
        name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const saveNewName = useCallback(() => {
    setTaskNameMutate({ name: newName });
    setIsEditMode(false);
  }, [newName]);

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
            {isEditMode ? (
              <>
                <Grid2>
                  <TextField
                    value={newName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setNewName(event.target.value);
                    }}
                    onSubmit={saveNewName}
                  ></TextField>
                </Grid2>
                <Grid2>
                  <IconButton
                    aria-label="save"
                    onClick={() => {
                      saveNewName();
                    }}
                    sx={{ padding: 0 }}
                  >
                    <Save />
                  </IconButton>
                </Grid2>
              </>
            ) : (
              <>
                <Grid2>
                  <Typography variant="body1">{task.name}</Typography>
                </Grid2>
                <Grid2>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteMutate();
                    }}
                    sx={{ padding: 0 }}
                  >
                    <Delete />
                  </IconButton>
                </Grid2>
                <Grid2>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setIsEditMode(true);
                    }}
                    sx={{ padding: 0 }}
                  >
                    <Edit />
                  </IconButton>
                </Grid2>
              </>
            )}
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
