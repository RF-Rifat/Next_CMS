export const metadata = {
  PluginName: "Blog",
  Version: "2.2.0",
  Description: "Blog plugin with dynamic posts",
};
// Unified dynamic hook registry
export const hooks = {
  Option: [
    {
      id: 1,
      title: "Recent Posts Widget",
      componentName: "RecentPosts",
      hookName: "Blog-header",
      position: 0,
      type: "widget",
      route: "/blog"
    }
  ],
  actions: [
    {
      id: 2,
      title: "Add Banner",
      componentName: "Banner",
      hookName: "Home-top",
      position: 1,
      type: "action"
    }
  ],

  Menu: [
    {
      _id: "1",
      name: "Page",
      link: "/nx-admin/page",
      parent_ID: "",
    },
  ],

  routes: [
    {
      id: 3,
      title: "Blog Listing",
      componentName: "BlogListing",
      hookName: "",
      position: 0,
      type: "view",
      route: "/blog"
    },
    {
      id: 4,
      title: "Single Blog",
      componentName: "PostView",
      hookName: "",
      position: 1,
      type: "view",
      route: "/blog/[slug]"
    }
  ]
};