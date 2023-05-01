import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Button, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { queryClient } from "../App";
import { TaskStatus } from "../components/TaskStatus";
import { TaskFragment } from "../fragments/taskFragment";
import { graphql, useFragment } from "../gql";
import { TaskProgress } from "../gql/graphql";
import { graphQLClient } from "../utils/request";
import csvDownload from "json-to-csv-export";
import { RealTimeDurationFragment } from "../fragments/realTimeDurationFragment";
import { Duration } from "luxon";
import { useSavedBoards } from "../hooks/useSavedBoards";

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

  const { addBoardId } = useSavedBoards();

  useEffect(() => {
    // for when board opened via link
    addBoardId(boardIdParsed);
  }, []);

  const { data } = useQuery({
    queryKey: ["boards", boardId],
    queryFn: async () =>
      graphQLClient.request(boardByIdQueryDocument, {
        id: boardIdParsed,
      }),
    refetchInterval: 1000,
  });

  const exportAsCsv = useCallback(() => {
    if (!data) {
      return;
    }
    const taskData = data?.getBoardById.tasks.map((taskData) => {
      const task = useFragment(TaskFragment, taskData);
      const totalTime = useFragment(RealTimeDurationFragment, task.totalTime);
      return {
        id: task.id,
        name: task.name,
        totalTime: Duration.fromISO(totalTime.totalSavedTime).toFormat(
          "hh:mm:ss"
        ),
      };
    });
    csvDownload({
      data: taskData,
      filename: "task_report",
      delimiter: ",",
      headers: ["ID", "Name", "Total Time Spent"],
    });
  }, [data]);

  const { mutate: setStatusMutate } = useMutation({
    mutationFn: async (args: { taskId: number; status: TaskProgress }) =>
      graphQLClient.request(setTaskStatusMutation, args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  const onDrop = useCallback(({ active, over }: DragEndEvent) => {
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
      <Grid2 container direction="column">
        <Grid2
          container
          direction="row"
          sx={{ bgcolor: "#c0c0c0", m: 2 }}
          spacing={3}
        >
          <Grid2 xs="auto">
            <Button variant="text" component={Link} to={`/`}>
              Home
            </Button>
          </Grid2>
          <Grid2>
            <Button onClick={exportAsCsv}>Export CSV</Button>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={3} sx={{ m: 0, mt: 3 }}>
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
      </Grid2>
    </DndContext>
  );
};
