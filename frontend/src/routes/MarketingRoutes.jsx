import {
  MarketingTabs,
  CampaignTabs,
  SocialTabs,
  BlogTabs,
} from "@/components/custom/tabs/Tabs";
import Marketing from "@/pages/marketing/Marketing";
import Subscribers from "@/pages/marketing/Subscribers";
import Campaigns from "@/pages/marketing/Campaigns";
import Scheduling from "@/pages/marketing/Scheduling";
import SocialPosts from "@/pages/marketing/SocialPosts";
import Blogs from "@/pages/marketing/Blogs";

export const marketingRoutes = [
  {
    path: "marketing/*",
    element: <MarketingTabs />,
    roles: ["admin", "marketing"],
    children: [
      { index: true, element: <Marketing />, roles: ["admin", "marketing"] },
      {
        path: "subscribers",
        element: <Subscribers />,
        roles: ["admin", "marketing"],
      },
      {
        path: "campaigns/*",
        element: <CampaignTabs />,
        roles: ["admin", "marketing"],
        children: [
          {
            index: true,
            element: <Campaigns />,
            roles: ["admin", "marketing"],
          },
          {
            path: "create",
            element: <h1>Create Campaign</h1>,
            roles: ["admin", "marketing"],
          },
          {
            path: "edit/:id",
            element: <h1>Edit Campaign</h1>,
            roles: ["admin", "marketing"],
          },
          {
            path: "reports/:id",
            element: <h1>Campaign Report</h1>,
            roles: ["admin", "marketing"],
          },
        ],
      },
      {
        path: "scheduling",
        element: <Scheduling />,
        roles: ["admin", "marketing"],
      },
      {
        path: "social/*",
        element: <SocialTabs />,
        roles: ["admin", "marketing"],
        children: [
          {
            index: true,
            element: <SocialPosts />,
            roles: ["admin", "marketing"],
          },
          {
            path: "calendar",
            element: <h1>Social Calendar</h1>,
            roles: ["admin", "marketing"],
          },
        ],
      },
      {
        path: "blogs/*",
        element: <BlogTabs />,
        roles: ["admin", "marketing"],
        children: [
          { index: true, element: <Blogs />, roles: ["admin", "marketing"] },
          {
            path: "create",
            element: <h1>Create Blog</h1>,
            roles: ["admin", "marketing"],
          },
          {
            path: "edit/:id",
            element: <h1>Edit Blog</h1>,
            roles: ["admin", "marketing"],
          },
        ],
      },
    ],
  },
];
