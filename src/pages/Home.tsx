import { FC } from "react";
import { graphql } from "../gql";
import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "../utils/request";
import { queryClient } from "../App";
import Grid2 from "@mui/material/Unstable_Grid2";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";

const createBoardMutation = graphql(`
  mutation createBoard($name: String!) {
    createBoard(name: $name) {
      id
    }
  }
`);

export const HomePage: FC = () => {
  const { mutate: createMutate } = useMutation({
    mutationFn: async (name: string) =>
      graphQLClient.request(createBoardMutation, { name }),
    onSuccess: (data) => {
      data.createBoard.id;
      queryClient.invalidateQueries({ queryKey: ["allBoards"] });
    },
  });
  return (
    <Grid2 container direction="column" xs={4}>
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
  );
};
