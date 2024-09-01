
import JobsSearchCmp from "../pages/JobsSearchCmp/JobsSearchCmp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const routes = [
    {
        path: "/",
        element: <JobsSearchCmp />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
];

export default routes;
