import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Library from "./Library";
import Creation from "./Creation";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Library />,
        },
        {
          path: "create",
          element: <Creation />,
        },
      ],
    },
  ],
  { basename: "farasha" },
);
