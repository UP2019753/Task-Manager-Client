import { FC } from "react";
import { BoardPage } from "./pages/Board";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/board/:boardId/",
    element: <BoardPage />,
  },
]);

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

// function App() {
//   const [count, setCount] = useState(0);
//   const [intervalId, setIntervalId] = useState<number | null>(null);

//   // setInterval, clearInterval

//   //Start and stop timer for task
//   const toggle = () => {
//     if (!intervalId) {
//       const newIntervalId = setInterval(() => {
//         setCount((prevCount) => prevCount + 1);
//       }, 1000);
//       setIntervalId(newIntervalId);
//     } else {
//       clearInterval(intervalId);
//       setIntervalId(null);
//     }
//   };

//   return (
//     <div className="App">
//       <button onClick={toggle}>Time spent: {count}</button>
//     </div>
//   );
// }

export default App;
