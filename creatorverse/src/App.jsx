import React from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // required styles

import HomePage from "./pages/HomePage";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";

function App() {
  const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/creators", element: <ShowCreators /> },
    { path: "/creators/add", element: <AddCreator /> },
    { path: "/creators/view/:id", element: <ViewCreator /> },
    { path: "/creators/edit/:id", element: <EditCreator /> },
  ];

  const element = useRoutes(routes);

  return (
    <div className="Appcontainer">
      {element}

      {/* Global toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
