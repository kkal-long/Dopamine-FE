import { router } from "@/router/Router";
import { RouterProvider } from "react-router-dom";

import useNotificationSSE from "@/hooks/notification/useNotificationSSEApi";
import { Toaster } from "react-hot-toast";

const App = () => {
  useNotificationSSE();

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
