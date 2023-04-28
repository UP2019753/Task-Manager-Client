import { FC } from "react";
import { graphql, useFragment } from "../gql";
import { useMutation, useQuery } from "@tanstack/react-query";
import { graphQLClient } from "../utils/request";
import { queryClient } from "../App";
import Grid2 from "@mui/material/Unstable_Grid2";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { useSavedBoards } from "../hooks/useSavedBoards";
import { BoardSummary } from "../components/BoardSummary";
import { BoardSummaryFragment } from "../fragments/boardSummaryFragment";

const getBoardsByIdQuery = graphql(`
  query getBoardsByIds($ids: [Int!]!) {
    getBoardsByIds(ids: $ids) {
      ...BoardSummary
    }
  }
`);

const createBoardMutation = graphql(`
  mutation createBoard($name: String!) {
    createBoard(name: $name) {
      id
    }
  }
`);

export const HomePage: FC = () => {
  const { addBoardId, savedBoards, setSavedBoards } = useSavedBoards();
  const { data } = useQuery({
    queryKey: ["boardSummaries", savedBoards],
    queryFn: async () =>
      graphQLClient.request(getBoardsByIdQuery, {
        ids: savedBoards,
      }),
  });
  const { mutate: createMutate } = useMutation({
    mutationFn: async (name: string) =>
      graphQLClient.request(createBoardMutation, { name }),
    onSuccess: (data) => {
      addBoardId(data.createBoard.id);
    },
  });
  return (
    <Grid2 container>
      <Grid2 xs />
      <Grid2 container direction="column" xs={4}>
        <Grid2>Main Menu</Grid2>
        {data?.getBoardsByIds.map((fragment) => {
          const board = useFragment(BoardSummaryFragment, fragment);
          return (
            <Grid2 key={board.id}>
              <BoardSummary board={fragment} />
            </Grid2>
          );
        })}
        <Grid2 display="flex" justifyContent="center">
          <IconButton
            aria-label="add"
            onClick={() => {
              createMutate("New Board");
            }}
          >
            <AddBox />
          </IconButton>
        </Grid2>
      </Grid2>
      <Grid2 xs />
    </Grid2>
  );
};
