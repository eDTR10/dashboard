import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { Suspense, lazy } from "react";

import NotFound from "./screens/notFound";
import Loader from './components/loader/loader.tsx';
import Dashboard from './screens/dashboard.tsx';

const DashboardLazy= lazy(() =>
  wait(1300).then(() => import("./screens/dashboard.tsx"))
);

const Page1= lazy(() =>
  wait(1300).then(() => import("./screens/page1.tsx"))
);

const Page2= lazy(() =>
  wait(1300).then(() => import("./screens/page2.tsx"))
);

const router = createBrowserRouter([
  {
    path: "/react-vite-supreme/",
    element: <DashboardLazy />,
    
    // children: [
    //   {
    //     path: "/react-vite-supreme/", 
    //     element: <Navigate to="/react-vite-supreme/page1" />, 
    //   },
    //   {
    //     path: "/react-vite-supreme/page1",
    //     element: <>
    //     <Suspense fallback={<Loader />}>
    //       <DashboardLazy />
    //     </Suspense>
    //   </>,
    //   },
    //   {
    //     path: "/react-vite-supreme/page2",
    //     element: <>
    //     <Suspense fallback={<Loader />}>
    //       <Page2 />
    //     </Suspense>
    //   </>,
    //   },



    //   {
    //     path: "*",
    //     element: <NotFound />,
    //   },
    // ],
  },
]);

function wait( time:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
