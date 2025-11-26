import { router } from "@/router/Router";
import { RouterProvider } from "react-router-dom";

import useNotificationSSE from "@/hooks/notification/useNotificationSSE";

const App = () => {
  useNotificationSSE();

  return <RouterProvider router={router} />;
};

export default App;
