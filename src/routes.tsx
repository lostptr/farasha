import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Library from "./pages/Library/Library";
import Creation from "./pages/Creation/Creation";

export const routes = createBrowserRouter(
  [
    {
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
  { basename: "/farasha/" },
);
