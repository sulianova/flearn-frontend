import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from 'ui/Page/Page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page header footer>This is a root page</Page>,
  },
  {
    path: "/profile",
    element: <Page header footer>This is a profile page</Page>,
  },
  {
    path: "/catalogue",
    element: <Page header footer>This is a catalogue page</Page>,
  },
  {
    path: "/free-zone",
    element: <Page header footer>This is a free zone page</Page>,
  },
]);

export default App;

function App() {
  return (
    <RouterProvider router={router} />
  );
}
