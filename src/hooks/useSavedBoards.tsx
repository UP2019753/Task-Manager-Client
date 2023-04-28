import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

const SAVED_BOARDS_KEY = "savedBoardsIds";

interface SavedBoardsResponse {
  savedBoards: number[];
  setSavedBoards: (id: number[]) => void;
  addBoardId: (id: number) => void;
  removeBoardId: (id: number) => void;
}

export const useSavedBoards = (): SavedBoardsResponse => {
  const [savedBoards, setSavedBoards] = useLocalStorage<number[]>(
    SAVED_BOARDS_KEY,
    []
  );
  const addBoardId = useCallback(
    (id: number) => {
      if (!savedBoards.includes(id)) {
        setSavedBoards([...savedBoards, id]);
      }
    },
    [savedBoards, setSavedBoards]
  );
  const removeBoardId = useCallback(
    (id: number) => {
      setSavedBoards(savedBoards.filter((bid) => bid !== id));
    },
    [savedBoards, setSavedBoards]
  );
  return { savedBoards, setSavedBoards, addBoardId, removeBoardId };
};
