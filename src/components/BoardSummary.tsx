import { Button, Card, IconButton, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { queryClient } from "../App";
import { TaskFragment } from "../fragments/taskFragment";
import { FragmentType, graphql, useFragment } from "../gql";
import { graphQLClient } from "../utils/request";
import { Delete, Edit, Save } from "@mui/icons-material";
import { BoardSummaryFragment } from "../fragments/boardSummaryFragment";
import { Link } from "react-router-dom";
import { useSavedBoards } from "../hooks/useSavedBoards";

export interface BoardProps {
  board: FragmentType<typeof BoardSummaryFragment>;
}

const setBoardNameMutation = graphql(`
  mutation setBoardNameMutation($boardId: Int!, $name: String!) {
    setBoardName(boardId: $boardId, name: $name) {
      id
    }
  }
`);

export const BoardSummary: FC<BoardProps> = (props) => {
  const board = useFragment(BoardSummaryFragment, props.board);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newName, setNewName] = useState(board.name);
  const { removeBoardId } = useSavedBoards();

  const { mutate: setBoardNameMutate } = useMutation({
    mutationFn: async ({ name }: { name: string }) =>
      graphQLClient.request(setBoardNameMutation, {
        boardId: board.id,
        name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boardSummaries"] });
    },
  });

  const saveNewName = useCallback(() => {
    setBoardNameMutate({ name: newName });
    setIsEditMode(false);
  }, [newName]);

  return (
    <Card>
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
                  <Typography variant="body1">{board.name}</Typography>
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
                <Grid2>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      removeBoardId(board.id);
                    }}
                    sx={{ padding: 0 }}
                  >
                    <Delete />
                  </IconButton>
                </Grid2>
              </>
            )}
          </Grid2>
        </Grid2>
        <Grid2 container>
          <Grid2 xs></Grid2>
          <Grid2 xs="auto">
            <Button variant="text" component={Link} to={`/board/${board.id}`}>
              Open
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Card>
  );
};
