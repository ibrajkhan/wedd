import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Story from "./Component/Story.jsx";
import BookingFlight from "./components/BookingFlight.jsx";
import OurStory from "./components/OurStory.jsx";
import Family from "./components/Family.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/our-story/",
    element: <OurStory />,
  },
  {
    path: "/flight-booking/",
    element: <BookingFlight />,
  },
  {
    path: "/family/",
    element: <Family />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
