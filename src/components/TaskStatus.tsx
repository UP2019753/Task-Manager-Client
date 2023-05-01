import { useDroppable } from "@dnd-kit/core";
import { AddBox } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { queryClient } from "../App";
import { TaskFragment } from "../fragments/taskFragment";
import { FragmentType, graphql, useFragment } from "../gql";
import { TaskProgress } from "../gql/graphql";
import { graphQLClient } from "../utils/request";
import { Task } from "./Task";

const taskProgressToTitle = {
  [TaskProgress.Notstarted]: "Not Started",
  [TaskProgress.Inprogress]: "In Progress",
  [TaskProgress.Done]: "Completed",
};

const createTaskMutation = graphql(`
  mutation createTask($id: Int!, $status: TaskProgress) {
    createTask(boardId: $id, name: "New Task", taskProgress: $status) {
      id
    }
  }
`);

export interface TaskStatusProps {
  tasks: FragmentType<typeof TaskFragment>[];
  status: TaskProgress;
  boardId: number;
}

export const TaskStatus: FC<TaskStatusProps> = ({ boardId, status, tasks }) => {
  const { mutate: createMutate } = useMutation({
    mutationFn: async (status?: TaskProgress) =>
      graphQLClient.request(createTaskMutation, { id: boardId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  const { setNodeRef } = useDroppable({
    id: `taskColumn-${status}`,
    data: {
      type: "taskColumn",
      status,
    },
  });
  return (
    <Grid2 container xs={4}>
      <Grid2
        xs={12}
        container
        direction="column"
        ref={setNodeRef}
        spacing={2}
        sx={{ bgcolor: "#F4F5F7", borderRadius: "6px", mx: 2 }}
      >
        <Grid2>
          <Typography variant="h4">{taskProgressToTitle[status]}</Typography>
        </Grid2>
        {tasks?.map((task) => {
          const fragmentData = useFragment(TaskFragment, task);
          return (
            <Grid2 key={fragmentData.id}>
              <Task task={task} />
            </Grid2>
          );
        })}

        <Grid2 display="flex" justifyContent="center">
          <IconButton
            aria-label="add"
            onClick={() => {
              createMutate(status);
            }}
          >
            <AddBox />
          </IconButton>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
