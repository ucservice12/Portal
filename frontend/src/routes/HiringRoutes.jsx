import {
  HiringTabs,
  CandidatesTabs,
  QuestionPapersTabs,
} from "@/components/custom/tabs/Tabs";
import Jobs from "@/pages/hiring/Jobs";
import Candidates from "@/pages/hiring/Candidates";
import QuestionPapers from "@/pages/hiring/QuestionPapers";

export const hiringRoutes = [
  {
    path: "hiring/*",
    element: <HiringTabs />,
    roles: ["hr", "admin"],
    children: [
      { index: true, element: <Jobs />, roles: ["hr", "admin"] },
      { path: "jobs", element: <Jobs />, roles: ["hr", "admin"] },
      {
        path: "candidates/*",
        element: <CandidatesTabs />,
        roles: ["hr", "admin"],
        children: [
          { index: true, element: <Candidates />, roles: ["hr", "admin"] },
          {
            path: "shortlisted",
            element: <h1>Shortlisted Candidates</h1>,
            roles: ["hr", "admin"],
          },
          {
            path: "interviews",
            element: <h1>Interviews</h1>,
            roles: ["hr", "admin"],
          },
        ],
      },
      {
        path: "question-papers/*",
        element: <QuestionPapersTabs />,
        roles: ["hr", "admin"],
        children: [
          { index: true, element: <QuestionPapers />, roles: ["hr", "admin"] },
          {
            path: "create",
            element: <h1>Create Question Paper</h1>,
            roles: ["hr", "admin"],
          },
          {
            path: "edit/:id",
            element: <h1>Edit Question Paper</h1>,
            roles: ["hr", "admin"],
          },
        ],
      },
    ],
  },
];
